const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

async function updateMohamed() {
    dotenv.config({ path: path.join(__dirname, '.env') });
    await mongoose.connect(process.env.MONGO_URI);
    
    const User = require('./models/User');
    const email = 'jasminpeer006@gmail.com';

    console.log("Renaming user to Mohamed:", email);
    
    const user = await User.findOne({ email });
    if (user) {
        user.name = 'Mohamed';
        await user.save();
        console.log("Success: Name updated to Mohamed.");
    } else {
        console.error("User not found!");
    }

    await mongoose.disconnect();
}

updateMohamed().catch(console.error);
