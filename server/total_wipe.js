const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

async function totalWipe() {
    dotenv.config({ path: path.join(__dirname, '.env') });
    await mongoose.connect(process.env.MONGO_URI);
    
    // Load Models
    const User = require('./models/User');
    const Profile = require('./models/Profile');
    const Progress = require('./models/Progress');
    
    const adminEmail = 'admin@gmail.com';
    
    console.log("--- STARTING TOTAL WIPE ---");
    
    // 1. Get Admin ID to preserve related data if any
    const admin = await User.findOne({ email: adminEmail });
    const adminId = admin ? admin._id : null;
    
    // 2. Clear Progress (usually students only)
    const progressResult = await Progress.deleteMany({});
    console.log(`Deleted ${progressResult.deletedCount} progress records.`);
    
    // 3. Clear Profiles
    const profileResult = await Profile.deleteMany({ user: { $ne: adminId } });
    console.log(`Deleted ${profileResult.deletedCount} profiles (kept admin profile if exists).`);
    
    // 4. Clear Users
    const userResult = await User.deleteMany({ email: { $ne: adminEmail } });
    console.log(`Deleted ${userResult.deletedCount} users (kept admin).`);
    
    if (admin) {
        console.log("Verified: Admin account still exists.");
    } else {
        console.log("Admin account not found - you may need to run setup_admin.js again.");
    }

    console.log("--- WIPE COMPLETE ---");
    await mongoose.disconnect();
}

totalWipe().catch(console.error);
