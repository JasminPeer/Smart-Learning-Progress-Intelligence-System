const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, updateUserDetails } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

// NEW: Nuclear Diagnostic Routes
router.post('/test-login', (req, res) => {
    res.json({
        success: true,
        message: 'Hardcoded login success',
        user: { name: 'Test User', role: 'student', email: 'test@test.com' },
        token: 'fake-token-for-testing'
    });
});

router.get('/logs', (req, res) => {
    // We can't easily read server logs, but we can return recent diagnostic info
    res.json({
        message: "Diagnostic Endpoint",
        env: process.env.NODE_ENV,
        db_status: require('mongoose').connection.readyState,
        recent_events: global.recentEvents || []
    });
});

router.get('/health', async (req, res) => {
    const mongoose = require('mongoose');
    res.json({
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        jwt_secret: !!process.env.JWT_SECRET,
        gemini_key: !!process.env.GEMINI_API_KEY,
        node_env: process.env.NODE_ENV || 'development'
    });
});
router.get('/me', protect, getMe);
router.put('/profile', protect, updateUserDetails);

module.exports = router;
