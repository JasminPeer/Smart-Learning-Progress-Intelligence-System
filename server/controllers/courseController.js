const asyncHandler = require('express-async-handler');
const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Private
const getCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find();
    res.status(200).json(courses);
});

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (Instructor only)
const createCourse = asyncHandler(async (req, res) => {
    if (req.user.role !== 'instructor' && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Not authorized to create a course. Faculty privileges required.');
    }

    const { title, description, category, level, duration, assessment } = req.body;

    if (!title || !description) {
        res.status(400);
        throw new Error('Please provide both title and description for the new course.');
    }

    const course = await Course.create({
        title,
        description,
        category: category || 'Development',
        level: level || 'Beginner',
        duration: duration || '8 Weeks',
        instructorId: req.user._id || req.user.id,
        assessment: assessment || { title: `${title} Certification`, questions: [] }
    });

    res.status(201).json(course);
});

module.exports = {
    getCourses,
    createCourse
};
