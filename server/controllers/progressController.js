const asyncHandler = require('express-async-handler');
const Progress = require('../models/Progress');

// @desc    Get progress
// @route   GET /api/progress
// @access  Private
const getProgress = asyncHandler(async (req, res) => {
    let query = {};
    if (req.user.role === 'student') {
        query = { studentId: req.user.id };
    }
    // Instructors/Admins can see all or filter by query params (simplification)
    
    const progress = await Progress.find(query).populate('courseId', 'title description');
    res.status(200).json(progress);
});

// @desc    Update/Create progress (Assign score/attendance)
// @route   POST /api/progress
// @access  Private (Instructor only)
const updateProgress = asyncHandler(async (req, res) => {
    if (req.user.role !== 'instructor' && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Not authorized to update progress');
    }

    const { studentId, courseId, score, attendance, completionPercentage } = req.body;

    // Check if progress entry exists
    let progress = await Progress.findOne({ studentId, courseId });

    if (progress) {
        progress.score = score || progress.score;
        progress.attendance = attendance || progress.attendance;
        progress.completionPercentage = completionPercentage || progress.completionPercentage;
        await progress.save();
        res.status(200).json(progress);
    } else {
        progress = await Progress.create({
            studentId,
            courseId,
            score,
            attendance,
            completionPercentage
        });
        res.status(201).json(progress);
    }
});

module.exports = {
    getProgress,
    updateProgress
};
