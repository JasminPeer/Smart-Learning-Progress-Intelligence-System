const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Course = require('../models/Course');
const Progress = require('../models/Progress');

// @desc    Get system wide statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getSystemStats = asyncHandler(async (req, res) => {
    const totalUsers = await User.countDocuments();
    const students = await User.countDocuments({ role: 'student' });
    const instructors = await User.countDocuments({ role: 'instructor' });
    const admins = await User.countDocuments({ role: 'admin' });

    res.json({
        totalUsers,
        students,
        instructors,
        admins,
        activeCourses: 45, // Hardcoded for now until Course model populated
        uptime: '99.8%'
    });
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.deleteOne();
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get all courses (for admin)
// @route   GET /api/admin/courses
// @access  Private/Admin
const getAllCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find({}).sort({ createdAt: -1 });
    res.json(courses);
});

// @desc    Create new course
// @route   POST /api/admin/courses
// @access  Private/Admin
const createCourse = asyncHandler(async (req, res) => {
    const { title, description, category, duration, topics, assessment } = req.body;
    const course = await Course.create({
        title,
        description,
        category,
        duration,
        topics,
        assessment,
        instructorId: req.user._id // Admin as instructor for now
    });
    res.status(201).json(course);
});

// @desc    Update course
// @route   PUT /api/admin/courses/:id
// @access  Private/Admin
const updateCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCourse);
});

// @desc    Delete course
// @route   DELETE /api/admin/courses/:id
// @access  Private/Admin
const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (course) {
        await course.deleteOne();
        res.json({ message: 'Course removed' });
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
});

// @desc    Get all students' progress
// @route   GET /api/admin/progress
// @access  Private/Admin
const getAllStudentProgress = asyncHandler(async (req, res) => {
    const progress = await Progress.find({})
        .populate('userId', 'name email')
        .populate('courseId', 'title');
    res.json(progress);
});

module.exports = {
    getSystemStats,
    getAllUsers,
    deleteUser,
    getAllCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    getAllStudentProgress
};
