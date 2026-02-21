const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

// Middleware to check for Admin or Instructor Role
const privileged = (req, res, next) => {
    console.log(`[ADMIN-AUTH] User: ${req.user?._id}, Role: ${req.user?.role}`);
    if (req.user && req.user.role && req.user.role.toLowerCase() === 'admin') {
        next();
    } else {
        console.warn(`[ADMIN-AUTH] DENIED: User Role: ${req.user?.role}`);
        res.status(401);
        throw new Error('Not authorized. Professional privileges required.');
    }
};

// Debug logger for ALL admin routes
router.use((req, res, next) => {
    console.log(`[ADMIN-ROUTE-DEBUG] ${req.method} ${req.originalUrl} | Router-Path: ${req.path} | Router-Base: ${req.baseUrl}`);
    next();
});

// AI Configuration - MOVE TO TOP to avoid param conflicts
router.get('/ai-config', protect, privileged, getAIConfig);
router.post('/ai-config', protect, privileged, updateAIConfig);
// Alias for compatibility
router.get('/config/ai', protect, privileged, getAIConfig);
router.post('/config/ai', protect, privileged, updateAIConfig);

router.get('/stats', protect, privileged, getSystemStats);
router.get('/users', protect, privileged, getAllUsers);
router.post('/users', protect, privileged, createUser);
router.get('/users/:id/stats', protect, privileged, getUserDetailedStats);
router.delete('/users/:id', protect, privileged, deleteUser);

// Course Management
router.get('/courses', protect, privileged, getAllCourses);
router.post('/courses', protect, privileged, createCourse);
router.put('/courses/:id', protect, privileged, updateCourse);
router.delete('/courses/:id', protect, privileged, deleteCourse);

// Progress Monitoring
router.get('/progress', protect, privileged, getAllStudentProgress);

// Engagement & Notifications
router.get('/engagement', protect, privileged, getEngagementStats);
router.post('/notifications', protect, privileged, sendNotification);

module.exports = router;
