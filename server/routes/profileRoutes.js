const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    getMyProfile, 
    updateProfile, 
    enrollCourse, 
    updateProgress, 
    saveCertificate, 
    unenrollCourse,
    verifyCertificate
} = require('../controllers/profileController');

router.get('/verify/:certId', verifyCertificate);
router.route('/me').get(protect, getMyProfile);
router.route('/').post(protect, updateProfile);
router.route('/enroll').post(protect, enrollCourse);
router.route('/unenroll/:courseId').delete(protect, unenrollCourse);
router.route('/progress').put(protect, updateProgress);
router.route('/certificate').post(protect, saveCertificate);

module.exports = router;
