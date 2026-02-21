const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

async function listModelsDefinitive() {
    dotenv.config({ path: path.join(__dirname, '.env') });
    const apiKey = process.env.GEMINI_API_KEY;
    
    try {
        const response = await axios.get(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
        );
        console.log("!!! AVAILABLE MODELS LIST !!!");
        const names = response.data.models.map(m => m.name);
        console.log(JSON.stringify(names, null, 2));
    } catch (err) {
        console.error("LIST FAILED:", err.response?.data || err.message);
    }
}

listModelsDefinitive();
