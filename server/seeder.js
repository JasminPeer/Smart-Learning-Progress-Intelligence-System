const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_learning_db');

const seedData = async () => {
    try {
        await User.deleteMany();
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);

        const users = [
            { name: 'Admin User', email: 'admin@test.com', password: hashedPassword, role: 'admin' },
            { name: 'Dr. Sarah Smith', email: 'instructor@test.com', password: hashedPassword, role: 'instructor' },
            { name: 'Prof. John Doe', email: 'john@test.com', password: hashedPassword, role: 'instructor' },
            { name: 'Alice Student', email: 'student@test.com', password: hashedPassword, role: 'student' },
            { name: 'Bob Brown', email: 'bob@test.com', password: hashedPassword, role: 'student' },
            { name: 'Charlie Green', email: 'charlie@test.com', password: hashedPassword, role: 'student' },
            { name: 'Daisy White', email: 'daisy@test.com', password: hashedPassword, role: 'student' },
        ];

        await User.insertMany(users);
        console.log('✅ Data seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
