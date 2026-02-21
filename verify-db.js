const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from the server directory
const serverDir = path.join(__dirname, 'server');
dotenv.config({ path: path.join(serverDir, '.env') });

// Use absolute paths for models
const User = require(path.join(serverDir, 'models', 'User'));
const Course = require(path.join(serverDir, 'models', 'Course'));

async function verify() {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_learning_db';
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');

        const userCount = await User.countDocuments();
        const courseCount = await Course.countDocuments();

        const users = await User.find().select('name email role');
        const courses = await Course.find().select('title category');

        console.log('\n--- DATABASE INTEGRITY REPORT ---');
        console.log(`Total Users: ${userCount}`);
        users.forEach(u => console.log(` - ${u.name} (${u.role})`));

        console.log(`\nTotal Courses: ${courseCount}`);
        courses.forEach(c => console.log(` - ${c.title} [${c.category}]`));

        if (courseCount === 17) {
            console.log('\n✅ Course count is exactly 17 as expected!');
        } else {
            console.log(`\n⚠️ Warning: Course count is ${courseCount}, expected 17.`);
        }

        if (userCount >= 8) {
            console.log('✅ User count is healthy!');
        }

        await mongoose.disconnect();
        console.log('\nVerification Complete.');
    } catch (err) {
        console.error('Verification Failed:', err);
    }
}

verify();
