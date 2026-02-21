const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');

dotenv.config();

const coursesData = [
    { title: "Mathematics (Class 6-10)", category: "Class 6-10" },
    { title: "Foundation Science (Class 6-10)", category: "Class 6-10" },
    { title: "Physics (Class 11-12)", category: "Class 11-12" },
    { title: "NEET Biology Masterclass", category: "NEET" },
    { title: "JEE Physics: Mechanics & Optics", category: "JEE" },
    { title: "Computer Science (Class 6-10)", category: "Class 6-10" },
    { title: "Economics (Class 11-12)", category: "Class 11-12" },
    { title: "Social Science (Class 6-10)", category: "Class 6-10" },
    { title: "English (Class 6-10)", category: "Class 6-10" },
    { title: "Chemistry (Class 11-12)", category: "Class 11-12" },
    { title: "Biology (Class 11-12)", category: "Class 11-12" },
    { title: "B.Tech (Information Technology)", category: "UG Courses" },
    { title: "MBA (Business Strategy)", category: "PG Courses" },
    { title: "B.Com (Business Accounting)", category: "UG Courses" },
    { title: "MCA (Software Systems)", category: "PG Courses" },
    { title: "B.Tech (CS Core)", category: "UG Courses" },
    { title: "PG Diploma in Data Science", category: "PG Courses" }
];

const seedCourses = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_learning_db');
        console.log('Connected to MongoDB');

        // CLEAR COLLECTION FIRST
        await Course.deleteMany({});
        console.log('Cleared existing courses.');

        for (const c of coursesData) {
            await Course.create({
                ...c,
                description: `Expert-led course for ${c.title}.`,
                duration: "52 Weeks",
                topics: [],
                assessment: { title: `${c.title} Exam`, questions: [] }
            });
            console.log(`Seeded course: ${c.title}`);
        }

        const total = await Course.countDocuments();
        console.log(`✅ All ${total} courses seeding completed!`);
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding courses:', error);
        process.exit(1);
    }
};

seedCourses();
