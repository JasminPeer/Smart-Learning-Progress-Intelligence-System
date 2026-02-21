const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, updateUserDetails } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
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
