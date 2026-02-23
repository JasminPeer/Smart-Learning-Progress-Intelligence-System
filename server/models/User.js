const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    },
    educationLevel: {
        type: String,
        required: [false, 'Please add an education level']
    },
    category: {
        type: String,
        required: [false, 'Please add a category']
    },
    enrolledCourses: [{
        courseId: { type: String },
        name: { type: String },
        progress: { type: Number, default: 0 },
        completed: { type: Boolean, default: false },
        certificateId: { type: String }
    }],
    mobileNumber: {
        type: String,
        required: [false, 'Please add a mobile number']
    },
    bio: {
        type: String,
        default: 'Student'
    },
    location: {
        type: String,
        default: 'Not set'
    },
    avatar: {
        type: String,
        default: ''
    },
    theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'light'
    },
    fontSize: {
        type: String,
        enum: ['small', 'medium', 'large'],
        default: 'medium'
    },
    lastLogin: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
