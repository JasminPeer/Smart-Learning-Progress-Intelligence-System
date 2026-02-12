const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    educationLevel: {
        type: String,
        required: true
    },
    instituteName: {
        type: String,
        required: true
    },
    mobile: {
        type: String
    },
    subjects: [
        {
            name: { type: String, required: true },
            currentMarks: { type: Number, required: true },
            totalMarks: { type: Number, required: true, default: 100 }
        }
    ],
    enrolledCourses: [
        {
            courseId: { type: String },
            name: { type: String },
            progress: { type: Number, default: 0 },
            completed: { type: Boolean, default: false },
            certificateId: { type: String }
        }
    ],
    achievements: [
        {
            title: { type: String },
            date: { type: Date, default: Date.now },
            icon: { type: String }
        }
    ],
    theme: {
        type: String,
        default: 'light'
    }
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
