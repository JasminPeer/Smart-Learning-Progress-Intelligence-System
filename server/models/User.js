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
        enum: ['student', 'instructor', 'admin'],
        default: 'student'
    },
    educationLevel: {
        type: String,
        required: [false, 'Please add an education level']
    },
    mobileNumber: {
        type: String,
        required: [false, 'Please add a mobile number']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
