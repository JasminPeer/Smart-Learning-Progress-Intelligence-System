const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

async function testGemini() {
    dotenv.config({ path: path.join(__dirname, '.env') });
    const apiKey = process.env.GEMINI_API_KEY;
    
    console.log("Testing Gemini API with key:", apiKey ? "FOUND" : "MISSING");
    if (!apiKey) return;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                contents: [{ parts: [{ text: "Hello, are you online?" }] }]
            }
        );
        console.log("Gemini Response SUCCESS!");
        console.log("AI says:", response.data.candidates[0].content.parts[0].text);
    } catch (err) {
        console.error("Gemini API FAIL:", err.response?.data || err.message);
    }
}

testGemini();
