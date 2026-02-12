const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

const createTestUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const email = 'student@test.com';
        const password = '123';
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if user exists
        let user = await User.findOne({ email });
        
        if (user) {
            console.log('User already exists. Updating password...');
            user.password = hashedPassword;
            await user.save();
            console.log('Password updated to: 123');
        } else {
            console.log('Creating new test user...');
            user = await User.create({
                name: 'Test Student',
                email: email,
                password: hashedPassword,
                role: 'student'
            });
            console.log('User created successfully!');
        }

        console.log('-----------------------------------');
        console.log('LOGIN CREDENTIALS:');
        console.log('Email: student@test.com');
        console.log('Password: 123');
        console.log('-----------------------------------');
        console.log('Use these details to Login.');

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createTestUser();
