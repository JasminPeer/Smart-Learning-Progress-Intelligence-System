const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        required: [true, 'Please add a course title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    detailedDescription: {
        type: String,
        default: ''
    },
    theory: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        default: '4 Weeks'
    },
    image: {
        type: String
    },
    introVideoUrl: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        default: 0
    },
    resources: [
        {
            title: { type: String },
            url: { type: String }
        }
    ],
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    topics: [
        {
            id: { type: String },
            title: { type: String },
            subtopics: [
                {
                    id: { type: String },
                    title: { type: String },
                    videoUrl: { type: String },
                    theory: { type: String },
                    text: { type: String },
                    mcqs: [
                        {
                            q: { type: String },
                            options: [{ type: String }],
                            a: { type: String }
                        }
                    ]
                }
            ]
        }
    ],
    assessment: {
        title: { type: String },
        passingScore: { type: Number, default: 70 },
        questions: [
            {
                id: { type: Number },
                question: { type: String },
                options: [{ type: String }],
                answer: { type: String }
            }
        ]
    },
    reviews: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            rating: { type: Number },
            comment: { type: String },
            createdAt: { type: Date, default: Date.now }
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
