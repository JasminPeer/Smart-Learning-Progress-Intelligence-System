const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

async function run() {
    dotenv.config({ path: path.join(__dirname, '.env') });
    await mongoose.connect(process.env.MONGO_URI);
    
    const User = require('./models/User');
    const email = 'jasminpeer006@gmail.com';
    const pass = '123456';

    console.log("Fixing account:", email);
    
    // Hash it manually
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, salt);
    
    // Update or Create
    let user = await User.findOne({ email });
    if (user) {
        user.password = hash;
        await user.save();
        console.log("Account updated.");
    } else {
        await User.create({ email, password: hash, name: 'Jasmin Peer', role: 'student' });
        console.log("Account created.");
    }

    // Verify immediately
    const verifyUser = await User.findOne({ email });
    const isMatch = await bcrypt.compare(pass, verifyUser.password);
    console.log("Immediate Verification Match:", isMatch);
    console.log("Stored Hash Prefix:", verifyUser.password.substring(0, 10));

    await mongoose.disconnect();
}

run().catch(console.error);
