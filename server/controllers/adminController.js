const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Course = require('../models/Course');
const Progress = require('../models/Progress');
const SystemConfig = require('../models/SystemConfig');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

// Helper to download image from URL to local storage
const downloadImage = async (url) => {
    if (!url || !url.startsWith('http')) return url; // Already local or invalid
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });

        const extension = url.split('.').pop().split(/[?#]/)[0] || 'jpg';
        const fileName = `course_${Date.now()}.${extension}`;
        const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
        
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const filePath = path.join(uploadsDir, fileName);
        const writer = fs.createWriteStream(filePath);

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => resolve(`/uploads/${fileName}`));
            writer.on('error', reject);
        });
    } catch (error) {
        console.error("Image download failed:", error.message);
        return url; // Fallback to original URL
    }
};

// @desc    Get system wide statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getSystemStats = asyncHandler(async (req, res) => {
    const totalUsers = await User.countDocuments();
    const students = await User.countDocuments({ role: 'student' });
    const admins = await User.countDocuments({ role: 'admin' });

    // Calculate Bottom 5 Students for Overview
    const studentsList = await User.find({ 
        role: 'student',
        name: { $nin: ['Guest User', 'Guest', 'test student'] }
    }).select('name email');
    const studentStats = await Promise.all(studentsList.map(async (s) => {
        const progress = await Progress.find({ studentId: s._id });
        let total = 0;
        progress.forEach(p => total += (p.completionPercentage || 0));
        const avg = progress.length > 0 ? Math.round(total / progress.length) : 0;
        return { _id: s._id, name: s.name, email: s.email, avgProgress: avg };
    }));

    const top5 = [...studentStats].sort((a,b) => b.avgProgress - a.avgProgress).slice(0, 5);
    const bottom5 = [...studentStats].sort((a,b) => a.avgProgress - b.avgProgress).slice(0, 5);

    res.json({
        totalUsers,
        students,
        admins,
        activeCourses: await Course.countDocuments(), 
        uptime: '99.9%',
        topStudents: top5,
        bottomStudents: bottom5
    });
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    // Verify DB connection if empty, but don't return mock data
    if (!users) {
        res.status(500);
        throw new Error('Server Error: Unable to fetch users');
    }
    res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.deleteOne();
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get all courses (for admin)
// @route   GET /api/admin/courses
// @access  Private/Admin
const getAllCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find({}).sort({ createdAt: -1 });
    res.json(courses);
});

// @desc    Create new course
// @route   POST /api/admin/courses
// @access  Private/Admin
const createCourse = asyncHandler(async (req, res) => {
    const { title, description, detailedDescription, theory, category, duration, image, introVideoUrl, rating, resources, topics, reviews, assessment } = req.body;

    const localImage = await downloadImage(image);

    const course = await Course.create({
        title,
        description,
        detailedDescription,
        theory,
        category,
        duration,
        image: localImage,
        introVideoUrl,
        rating: rating || 0,
        resources: resources || [],
        topics: topics || [],
        reviews: reviews || [],
        assessment: assessment || { title: 'Final Assessment', questions: [] },
        instructorId: req.user._id
    });

    res.status(201).json(course);
});

// @desc    Update course
// @route   PUT /api/admin/courses/:id
// @access  Private/Admin
const updateCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    const { title, description, detailedDescription, theory, category, duration, image, introVideoUrl, rating, resources, topics, reviews, assessment } = req.body;

    if (image && image !== course.image) {
        course.image = await downloadImage(image);
    }

    course.title = title !== undefined ? title : course.title;
    course.description = description !== undefined ? description : course.description;
    course.detailedDescription = detailedDescription !== undefined ? detailedDescription : course.detailedDescription;
    course.theory = theory !== undefined ? theory : course.theory;
    course.category = category !== undefined ? category : course.category;
    course.duration = duration !== undefined ? duration : course.duration;
    // course.image = image !== undefined ? image : course.image; // Handled above
    course.introVideoUrl = introVideoUrl !== undefined ? introVideoUrl : course.introVideoUrl;
    course.rating = rating !== undefined ? rating : course.rating;
    course.resources = resources !== undefined ? resources : course.resources;
    course.topics = topics !== undefined ? topics : course.topics;
    course.reviews = reviews !== undefined ? reviews : course.reviews;
    course.assessment = assessment !== undefined ? assessment : course.assessment;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
});

// @desc    Delete course
// @route   DELETE /api/admin/courses/:id
// @access  Private/Admin
const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (course) {
        await course.deleteOne();
        res.json({ message: 'Course removed' });
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
});

// @desc    Get all students' progress
// @route   GET /api/admin/progress
// @access  Private/Admin
const getAllStudentProgress = asyncHandler(async (req, res) => {
    // Use Profile (source of truth) since it stores real course names during enrollment
    const Profile = require('../models/Profile');
    const profiles = await Profile.find({
        'enrolledCourses.0': { $exists: true }
    }).populate('user', 'name email');

    // Also fetch Progress records for completion percentage
    const progressRecords = await Progress.find({});
    // Build a map: studentId + courseId => completionPercentage
    const progressMap = {};
    progressRecords.forEach(p => {
        const key = `${p.studentId?.toString()}_${p.courseId}`;
        progressMap[key] = p.completionPercentage || 0;
    });

    // Flatten all enrolled courses from all profiles
    const enrichedProgress = [];
    profiles.forEach(profile => {
        if (!profile.user) return; // skip orphaned profiles
        profile.enrolledCourses.forEach(ec => {
            const key = `${profile.user._id.toString()}_${ec.courseId}`;
            const completion = progressMap[key] ?? (ec.progress || 0);
            enrichedProgress.push({
                userId: { name: profile.user.name, email: profile.user.email },
                courseId: { title: ec.name || 'Unknown Course', id: ec.courseId },
                progress: completion,
                completed: ec.completed || false
            });
        });
    });

    res.json(enrichedProgress);
});

// @desc    Create a user (Admin only)
// @route   POST /api/admin/users
// @access  Private/Admin
const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'student',
        category: req.body.category || '',
        educationLevel: req.body.category || '',
        mobileNumber: req.body.mobileNumber || '',
        enrolledCourses: []
    });

    // Auto-create Profile for students
    if (user && user.role === 'student') {
        await Profile.create({
            user: user._id,
            educationLevel: user.educationLevel || 'N/A',
            instituteName: 'N/A',
            mobile: user.mobileNumber || '',
            subjects: [],
            enrolledCourses: [],
            achievements: []
        });
    }

    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    });
});

// @desc    Get detailed student stats
// @route   GET /api/admin/users/:id/stats
// @access  Private/Admin
const getUserDetailedStats = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    
    // Enrollments
    const progressRecords = await Progress.find({ studentId: userId });
    
    // Manual course lookup helper
    const allCourses = await Course.find({}).select('id title');
    const courseMap = {};
    allCourses.forEach(c => { 
        if (c.id) courseMap[c.id] = c.title;
        courseMap[c._id.toString()] = c.title;
        courseMap[c.title.toLowerCase()] = c.title;
    });

    // Map Static Courses
    const staticIds = [
        ["class-6-10-maths", "Mathematics (Class 6-10)"],
        ["class-6-10-science", "Foundation Science (Class 6-10)"],
        ["class-6-10-social", "Social Science (Class 6-10)"],
        ["class-6-10-english", "English (Class 6-10)"],
        ["class-11-12-physics", "Physics (Class 11-12)"],
        ["class-11-12-chem", "Chemistry (Class 11-12)"],
        ["class-11-12-bio", "Biology (Class 11-12)"],
        ["pg-data-science", "PG Diploma in Data Science"]
    ];
    staticIds.forEach(([id, title]) => {
        if (!courseMap[id]) courseMap[id] = title;
    });

    // Fallback from User model
    const studentsWithCourses2 = await User.find({ "enrolledCourses.0": { $exists: true } }).select('enrolledCourses');
    studentsWithCourses2.forEach(u => {
        u.enrolledCourses.forEach(ec => {
            if (ec.courseId && ec.name && !courseMap[ec.courseId]) {
                courseMap[ec.courseId] = ec.name;
            }
        });
    });
    const enrolledCount = progressRecords.length;
    
    // Certificates (Completed courses)
    const completedRecords = progressRecords.filter(p => p.completionPercentage >= 100);
    const certificatesCount = completedRecords.length;
    
    // Average Progress & Risk Category
    let totalProgress = 0;
    progressRecords.forEach(p => totalProgress += (p.completionPercentage || 0));
    const avgProgress = enrolledCount > 0 ? (totalProgress / enrolledCount) : 0;
    
    let category = 'Neutral';
    if (enrolledCount > 0) {
        if (avgProgress >= 70) category = 'Good';
        else if (avgProgress >= 40) category = 'Medium';
        else category = 'Risk';
    }

    res.json({
        enrolledCount,
        certificatesCount,
        avgProgress: Math.round(avgProgress),
        category,
        courses: progressRecords.map(p => ({
            title: courseMap[p.courseId] || courseMap[p.courseId?.toLowerCase()] || 'Unknown Course',
            progress: p.completionPercentage,
            score: p.score
        }))
    });
});

// @desc    Get top students for engagement
// @route   GET /api/admin/engagement
// @access  Private/Admin
const getEngagementStats = asyncHandler(async (req, res) => {
    const studentsList = await User.find({ 
        role: 'student',
        name: { $nin: ['Guest User', 'Guest', 'test student'] }
    }).select('name email');
    const studentStats = await Promise.all(studentsList.map(async (s) => {
        const progress = await Progress.find({ studentId: s._id });
        let total = 0;
        progress.forEach(p => total += (p.completionPercentage || 0));
        const avg = progress.length > 0 ? Math.round(total / progress.length) : 0;
        const certs = progress.filter(p => p.completionPercentage >= 100).length;
        return { _id: s._id, name: s.name, email: s.email, avgProgress: avg, certificates: certs };
    }));

    const top5 = [...studentStats].sort((a,b) => b.avgProgress - a.avgProgress).slice(0, 5);
    const bottom5 = [...studentStats].sort((a,b) => a.avgProgress - b.avgProgress).slice(0, 5);
    
    res.json({ 
        topStudents: top5,
        bottomStudents: bottom5
    });
});

// @desc    Send notification to user
// @route   POST /api/admin/notifications
// @access  Private/Admin
const sendNotification = asyncHandler(async (req, res) => {
    const { recipientId, message, type } = req.body;
    const notification = await require('../models/Notification').create({
        recipientId,
        senderId: req.user._id,
        message,
        type: type || 'alert'
    });
    res.status(201).json(notification);
});

// @desc    Get AI Configuration
// @route   GET /api/admin/ai-config
// @access  Private/Admin
const getAIConfig = asyncHandler(async (req, res) => {
    let config = await SystemConfig.findOne({ key: 'ai_config' });
    if (!config) {
        config = await SystemConfig.create({ key: 'ai_config' });
    }
    res.json(config.value);
});

// @desc    Update AI Configuration
// @route   POST /api/admin/ai-config
// @access  Private/Admin
const updateAIConfig = asyncHandler(async (req, res) => {
    const { name, behaviour, condition, wayOfSpeech, requiredDetails, apiVersion } = req.body;
    
    let config = await SystemConfig.findOne({ key: 'ai_config' });
    if (!config) {
        config = new SystemConfig({ key: 'ai_config' });
    }

    config.value = {
        name: name || config.value.name,
        behaviour: behaviour || config.value.behaviour,
        condition: condition || config.value.condition,
        wayOfSpeech: wayOfSpeech || config.value.wayOfSpeech,
        requiredDetails: requiredDetails || config.value.requiredDetails,
        apiVersion: apiVersion || config.value.apiVersion
    };

    const updatedConfig = await config.save();
    res.json(updatedConfig.value);
});

module.exports = {
    getSystemStats,
    getAllUsers,
    deleteUser,
    getAllCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    getAllStudentProgress,
    createUser,
    getUserDetailedStats,
    getEngagementStats,
    sendNotification,
    getAIConfig,
    updateAIConfig
};
