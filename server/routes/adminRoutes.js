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
    getAllStudentProgress
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

// Middleware to check for Admin or Instructor Role
const privileged = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'instructor')) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized. Professional privileges required.');
    }
};

router.get('/stats', protect, privileged, getSystemStats);
router.get('/users', protect, privileged, getAllUsers);
router.delete('/users/:id', protect, privileged, deleteUser);

// Course Management
router.get('/courses', protect, privileged, getAllCourses);
router.post('/courses', protect, privileged, createCourse);
router.put('/courses/:id', protect, privileged, updateCourse);
router.delete('/courses/:id', protect, privileged, deleteCourse);

// Progress Monitoring
router.get('/progress', protect, privileged, getAllStudentProgress);

module.exports = router;
