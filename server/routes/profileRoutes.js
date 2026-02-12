const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    getMyProfile, 
    updateProfile, 
    enrollCourse, 
    updateProgress, 
    saveCertificate 
} = require('../controllers/profileController');

router.route('/me').get(protect, getMyProfile);
router.route('/').post(protect, updateProfile);
router.route('/enroll').post(protect, enrollCourse);
router.route('/progress').put(protect, updateProgress);
router.route('/certificate').post(protect, saveCertificate);

module.exports = router;
