const mongoose = require('mongoose');

const progressSchema = mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    courseId: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    attendance: {
        type: Number,
        default: 0
    },
    completionPercentage: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Progress', progressSchema);
