const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Profile = require('../models/Profile');

// @desc    Get current user profile
// @route   GET /api/profile/me
// @access  Private
const getMyProfile = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
        res.json(profile);
    } else {
        res.status(404);
        throw new Error('Profile not found');
    }
});

// @desc    Create or Update user profile (Onboarding)
// @route   POST /api/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
    const { educationLevel, instituteName, mobile, subjects, theme } = req.body;

    const profileFields = {
        user: req.user.id,
        educationLevel,
        instituteName,
        mobile,
        subjects,
        theme
    };

    // Upsert (Create if new, Update if exists)
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
        );
        res.json(profile);
    } else {
        // Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    }
});

// @desc    Enroll in a course
// @route   POST /api/profile/enroll
// @access  Private
const enrollCourse = asyncHandler(async (req, res) => {
    const { courseId, name } = req.body;
    
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
        res.status(404);
        throw new Error('Profile not found');
    }

    // Check if already enrolled
    if (profile.enrolledCourses.some(c => c.courseId === courseId)) {
        res.status(400);
        throw new Error('Already enrolled');
    }

    profile.enrolledCourses.push({ courseId, name, progress: 0 });
    await profile.save();
    res.json(profile.enrolledCourses);
});

// @desc    Update course progress
// @route   PUT /api/profile/progress
// @access  Private
const updateProgress = asyncHandler(async (req, res) => {
    const { courseId, progress, completed } = req.body;
    
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
        res.status(404);
        throw new Error('Profile not found');
    }

    const courseIndex = profile.enrolledCourses.findIndex(c => c.courseId === courseId);
    if (courseIndex > -1) {
        profile.enrolledCourses[courseIndex].progress = progress;
        if (completed) profile.enrolledCourses[courseIndex].completed = true;
        
        // Update subjects marks simulation based on learning
        // This connects the learning back to the "Stats" dashboard
        const subjectName = profile.enrolledCourses[courseIndex].name.split(' ')[0]; // Approx mapping
        const subjectIdx = profile.subjects.findIndex(s => s.name.includes(subjectName));
        if (subjectIdx > -1) {
             profile.subjects[subjectIdx].currentMarks = Math.min(100, profile.subjects[subjectIdx].currentMarks + 5);
        }

        await profile.save();
        res.json(profile.enrolledCourses);
    } else {
        res.status(404);
        throw new Error('Course not enrolled');
    }
});

// @desc    Save Assessment Result & Certificate
// @route   POST /api/profile/certificate
// @access  Private
const saveCertificate = asyncHandler(async (req, res) => {
    try {
        const { courseId, courseName, score } = req.body;
        console.log(`[Certificate API Request] User: ${req.user?._id}, Course: ${courseId}, Name: ${courseName}`);

        if (!req.user) {
            console.error("[Certificate API] Error: req.user is missing");
            res.status(401);
            throw new Error('User context missing. Please logout and login again.');
        }

        const userId = req.user._id || req.user.id;

        if (!courseId || !courseName) {
            console.error("[Certificate API] Error: missing courseId or courseName");
            res.status(400);
            throw new Error('Missing required data: Course ID and Name.');
        }

        let profile = await Profile.findOne({ user: userId });

        if (!profile) {
            console.log(`[Certificate API] No profile for user ${userId}. Auto-creating one.`);
            profile = new Profile({
                user: userId,
                educationLevel: 'Learning Journey Started',
                instituteName: 'LearnIQ Academy',
                subjects: [],
                enrolledCourses: [],
                achievements: []
            });
            // Preliminary save to handle required fields and uniqueness
            await profile.save();
        }

        // Ensure achievements array exists
        if (!profile.achievements) profile.achievements = [];
        
        const certTitle = `Certified in ${courseName}`;
        const hasAchievement = profile.achievements.some(a => a.title === certTitle);
        
        if (!hasAchievement) {
            console.log(`[Certificate API] Awarding new certificate: ${certTitle}`);
            profile.achievements.push({
                title: certTitle,
                date: new Date(),
                icon: 'Award'
            });
            profile.markModified('achievements');
        }

        // Ensure enrolledCourses array exists
        if (!profile.enrolledCourses) profile.enrolledCourses = [];

        const courseIdx = profile.enrolledCourses.findIndex(c => c.courseId === courseId);
        if (courseIdx > -1) {
            console.log(`[Certificate API] Updating existing course progress for ${courseId}`);
            profile.enrolledCourses[courseIdx].completed = true;
            profile.enrolledCourses[courseIdx].progress = 100;
            if (!profile.enrolledCourses[courseIdx].certificateId) {
                profile.enrolledCourses[courseIdx].certificateId = `CERT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
            }
        } else {
            console.log(`[Certificate API] Adding new completed course entry for ${courseId}`);
            profile.enrolledCourses.push({
                courseId,
                name: courseName,
                progress: 100,
                completed: true,
                certificateId: `CERT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
            });
        }
        
        profile.markModified('enrolledCourses');
        
        const savedProfile = await profile.save();
        console.log(`[Certificate API] SUCCESS for user ${userId}`);
        res.json(savedProfile);

    } catch (error) {
        console.error(`[Certificate API CRITICAL]`, error.message);
        const code = res.statusCode === 200 ? 500 : res.statusCode;
        res.status(code).json({
            message: error.message || "Failed to save certificate progress",
            stack: process.env.NODE_ENV === 'production' ? null : error.stack
        });
    }
});

module.exports = {
    getMyProfile,
    updateProfile,
    enrollCourse,
    updateProgress,
    saveCertificate
};
