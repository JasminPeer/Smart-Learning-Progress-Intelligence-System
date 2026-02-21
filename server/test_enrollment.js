const mongoose = require('mongoose');
const User = require('./models/User');
const Profile = require('./models/Profile');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const enrollTest = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const userEmail = 'haris@gmail.com';
        const user = await User.findOne({ email: userEmail });
        
        if (!user) {
            console.log(`User ${userEmail} not found`);
            process.exit(1);
        }

        console.log(`Testing enrollment for user: ${user.email} (${user._id})`);

        const courseId = 'test-course-123';
        const courseName = 'Test Course';

        let profile = await Profile.findOne({ user: user._id });
        if (!profile) {
            console.log('Profile not found, creating...');
            profile = await Profile.create({
                user: user._id,
                educationLevel: user.educationLevel || 'Learning Started',
                instituteName: 'LearnIQ Test',
                subjects: [],
                enrolledCourses: [],
                achievements: []
            });
        }

        if (profile.enrolledCourses && profile.enrolledCourses.some(c => c.courseId === courseId)) {
            console.log('Already enrolled in test course, removing it first for clean test.');
            profile.enrolledCourses = profile.enrolledCourses.filter(c => c.courseId !== courseId);
            await profile.save();
        }

        console.log('Attempting to push enrollment...');
        profile.enrolledCourses.push({ courseId, name: courseName, progress: 0 });
        
        const savedProfile = await profile.save();
        
        // Sync with User
        await User.findByIdAndUpdate(user._id, {
            $push: { enrolledCourses: { courseId, name: courseName, progress: 0 } }
        });

        const updatedUser = await User.findById(user._id);

        console.log('Enrollment successful in test script!');
        console.log('Profile Enrollment Count:', savedProfile.enrolledCourses.length);
        console.log('User Enrollment Count:', updatedUser.enrolledCourses.length);
        
        if (updatedUser.enrolledCourses.length > 0 && updatedUser.enrolledCourses.some(c => c.courseId === courseId)) {
            console.log('SUCCESS: User model is synchronized.');
        } else {
            console.log('FAILURE: User model is NOT synchronized.');
        }

        mongoose.connection.close();
    } catch (error) {
        console.error('Enrollment Test FAILED:', error);
        process.exit(1);
    }
};

enrollTest();
