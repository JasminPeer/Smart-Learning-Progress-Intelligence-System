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
        
        const usersData = [
            { name: 'Admin User', email: 'admin@gmail.com', password: 'admin123', role: 'admin' },
            { name: 'Haris Student', email: 'haris@gmail.com', password: 'haris123', role: 'student' },
            { name: 'Peer student', email: 'peer@gmail.com', password: 'peer123', role: 'student' },
            { name: 'Sameera student', email: 'sameera@gmail.com', password: 'sameera123', role: 'student' },
            { name: 'Jasmin Admin', email: 'jasmin@gmail.com', password: 'jasmin123', role: 'admin' },
            { name: 'Fathima student', email: 'fathima@gmail.com', password: 'fathima123', role: 'student' },
            { name: 'Guest User', email: 'demo@learniq.com', password: '123456', role: 'student' },
        ];

        const users = await Promise.all(usersData.map(async (u) => {
            const hashedPassword = await bcrypt.hash(u.password, salt);
            return { ...u, password: hashedPassword };
        }));

        await User.insertMany(users);
        console.log('✅ Users with custom passwords seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding users:', error);
        process.exit(1);
    }
};

seedData();
