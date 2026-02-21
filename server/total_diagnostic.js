const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

async function run() {
    console.log("--- TOTAL DIAGNOSTIC START ---");
    
    // 1. Check axios
    try {
        const axios = require('axios');
        console.log("Axios required successfully. Version:", axios.VERSION || "unknown");
    } catch (err) {
        console.error("AXIOS MODULE NOT FOUND:", err.message);
    }

    // 2. Load Env
    const envPath = path.join(__dirname, '.env');
    dotenv.config({ path: envPath });
    console.log("Env loaded from:", envPath);
    console.log("PORT:", process.env.PORT);
    console.log("MONGO_URI:", process.env.MONGO_URI ? "HIDDEN (exists)" : "MISSING");
    console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "HIDDEN (exists)" : "MISSING");

    // 3. Connect DB
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_learning_db');
        console.log("MongoDB Connected.");
    } catch (err) {
        console.error("MongoDB Connection Failed:", err.message);
        return;
    }

    // 4. List Users
    try {
        const User = mongoose.model('User', new mongoose.Schema({ email: String, role: String }));
        const users = await User.find({});
        console.log("Found Users:", users.length);
        users.forEach(u => console.log(` - ${u.email} (${u.role})`));
    } catch (err) {
        console.error("User list failed:", err.message);
    }

    // 5. Check images
    const fs = require('fs');
    const storePath = path.join(__dirname, '..', 'client', 'src', 'assets', 'store');
    const imagesToCheck = ['class-11-12-chem.jpg', 'class-11-12-physics.jpg', 'pg-data-science.jpg'];
    imagesToCheck.forEach(img => {
        const p = path.join(storePath, img);
        if (fs.existsSync(p)) {
            const stats = fs.statSync(p);
            console.log(`Image ${img}: EXISTS, Size: ${stats.size} bytes`);
        } else {
            console.log(`Image ${img}: MISSING at ${p}`);
        }
    });

    console.log("--- TOTAL DIAGNOSTIC END ---");
    await mongoose.disconnect();
}

run();
