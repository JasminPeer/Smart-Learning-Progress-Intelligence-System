const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a course title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
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
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
