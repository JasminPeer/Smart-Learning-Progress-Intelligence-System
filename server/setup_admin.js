const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

async function run() {
    dotenv.config({ path: path.join(__dirname, '.env') });
    await mongoose.connect(process.env.MONGO_URI);
    
    const User = require('./models/User');
    const email = 'admin@gmail.com';
    const pass = 'admin123';

    console.log("Setting up Admin account:", email);
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, salt);
    
    let user = await User.findOne({ email });
    if (user) {
        user.password = hash;
        user.role = 'admin'; // Force role just in case
        await user.save();
        console.log("Admin account updated.");
    } else {
        await User.create({ email, password: hash, name: 'System Admin', role: 'admin' });
        console.log("Admin account created.");
    }

    // Verify
    const verifyUser = await User.findOne({ email });
    const isMatch = await bcrypt.compare(pass, verifyUser.password);
    console.log("Admin Password Verification:", isMatch ? "SUCCESS" : "FAIL");

    await mongoose.disconnect();
}

run().catch(console.error);
