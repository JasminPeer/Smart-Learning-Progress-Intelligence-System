const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

const users = [
    {
        name: 'Demo Student',
        email: 'student@test.com',
        password: '123456', // Will be hashed
        role: 'student',
        category: 'Class 11-12'
    },
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: 'admin123',
        role: 'admin',
        category: 'N/A'
    },
    {
        name: 'Guest User',
        email: 'demo@learniq.com',
        password: '123456',
        role: 'student',
        category: 'Guest'
    }
];

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        for (const user of users) {
            const userExists = await User.findOne({ email: user.email });
            if (!userExists) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(user.password, salt);
                await User.create({ ...user, password: hashedPassword });
                console.log(`Created user: ${user.email}`);
            } else {
                console.log(`User already exists: ${user.email}`);
            }
        }

        console.log('Seeding completed');
        process.exit();
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
