const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

async function purge() {
    dotenv.config({ path: path.join(__dirname, '.env') });
    await mongoose.connect(process.env.MONGO_URI);
    
    const User = require('./models/User');
    const keepEmails = ['admin@gmail.com', 'jasminpeer006@gmail.com'];

    console.log("Purging all users EXCEPT:", keepEmails);
    
    const result = await User.deleteMany({ email: { $nin: keepEmails } });
    console.log(`Deleted ${result.deletedCount} users.`);

    // List remaining
    const remaining = await User.find({}, 'email name role');
    console.log("Remaining users:", remaining);

    await mongoose.disconnect();
}

purge().catch(console.error);
