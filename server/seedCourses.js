const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');

dotenv.config();

const coursesData = [
    { id: "class-6-10-maths", title: "Mathematics (Class 6-10)", category: "Class 6-10" },
    { id: "class-6-10-science", title: "Foundation Science (Class 6-10)", category: "K-12" },
    { id: "class-11-12-physics", title: "Physics (Class 11-12)", category: "Class 11-12" },
    { id: "class-6-10-social", title: "Social Science (Class 6-10)", category: "Class 6-10" },
    { id: "class-6-10-english", title: "English (Class 6-10)", category: "Class 6-10" },
    { id: "class-11-12-chem", title: "Chemistry (Class 11-12)", category: "Class 11-12" },
    { id: "class-11-12-bio", title: "Biology (Class 11-12)", category: "Class 11-12" },
    { id: "neet-biology", title: "NEET Biology Masterclass", category: "NEET" },
    { id: "jee-physics", title: "JEE Physics: Mechanics & Optics", category: "JEE" },
    { id: "pg-data-science", title: "PG Diploma in Data Science", category: "PG Courses" },
    { id: "ug-btech", title: "B.Tech (Information Technology)", category: "UG Courses" },
    { id: "pg-mba", title: "MBA (Business Strategy)", category: "PG Courses" },
    { id: "class-6-10-cs", title: "Computer Science (Class 6-10)", category: "Class 6-10" },
    { id: "class-11-12-econ", title: "Economics (Class 11-12)", category: "Class 11-12" },
    { id: "ug-bcom", title: "B.Com (Business Accounting)", category: "UG Courses" },
    { id: "pg-mca", title: "MCA (Software Systems)", category: "PG Courses" },
    { id: "ug-btech-cs", title: "B.Tech (CS Core)", category: "UG Courses" }
];

const seedCourses = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_learning_db');
        console.log('Connected to MongoDB');

        for (const c of coursesData) {
            const exists = await Course.findOne({ title: c.title });
            if (!exists) {
                await Course.create({
                    ...c,
                    description: `Expert-led course for ${c.title}.`,
                    duration: "52 Weeks",
                    topics: [],
                    assessment: { title: `${c.title} Exam`, questions: [] }
                });
                console.log(`Seeded course: ${c.title}`);
            }
        }

        console.log('✅ All 17 courses seeding completed!');
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding courses:', error);
        process.exit(1);
    }
};

seedCourses();
