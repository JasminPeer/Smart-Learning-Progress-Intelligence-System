const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config({ path: path.join(__dirname, '.env') });

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Data Healing / Migration logic
const syncProgressData = async () => {
    try {
        const Profile = require('./models/Profile');
        const Progress = require('./models/Progress');
        const profiles = await Profile.find({});
        console.log(`[Healing] Checking ${profiles.length} profiles for missing progress records...`);
        
        let createdCount = 0;
        for (const profile of profiles) {
            if (profile.enrolledCourses && profile.enrolledCourses.length > 0) {
                for (const course of profile.enrolledCourses) {
                    // Check if progress record exists
                    const exists = await Progress.findOne({ 
                        studentId: profile.user, 
                        courseId: course.courseId 
                    });
                    
                    if (!exists) {
                        try {
                            await Progress.create({
                                studentId: profile.user,
                                courseId: course.courseId,
                                completionPercentage: course.progress || 0,
                                score: 0,
                                attendance: 0
                            });
                            createdCount++;
                        } catch (err) {
                            console.error(`[Healing] Failed to create record for ${course.courseId}:`, err.message);
                        }
                    }
                }
            }
        }
        if (createdCount > 0) {
            console.log(`[Healing] Successfully synced ${createdCount} missing progress records.`);
        } else {
            console.log(`[Healing] All student data is already in sync.`);
        }
    } catch (err) {
        console.error(`[Healing Error] Migration failed:`, err.message);
    }
};

// Run healing after a short delay to ensure DB is fully ready
setTimeout(syncProgressData, 5000);

// Debug logger
app.use((req, res, next) => {
    console.log(`[DEBUG] ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/profile', require('./routes/profileRoutes')); 
app.use('/api/chatbot', require('./routes/chatbotRoutes')); 
app.use('/api/notifications', require('./routes/notificationRoutes'));

// 404 Handler
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

// Global Error Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    console.error(`[Server Error Check] ${req.method} ${req.url}:`, err);
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));