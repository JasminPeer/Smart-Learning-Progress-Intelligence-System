const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

async function listModels() {
    dotenv.config({ path: path.join(__dirname, '.env') });
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
        console.error("API Key missing!");
        return;
    }

    try {
        const response = await axios.get(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
        );
        console.log("SUCCESS! Available models:");
        response.data.models.forEach(m => {
            console.log(` - ${m.name}`);
        });
    } catch (err) {
        console.error("List Models FAIL:", err.response?.data || err.message);
    }
}

listModels();
