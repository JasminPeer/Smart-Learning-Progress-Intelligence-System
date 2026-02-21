const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

async function testPro() {
    dotenv.config({ path: path.join(__dirname, '.env') });
    const apiKey = process.env.GEMINI_API_KEY;
    
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
            {
                contents: [{ parts: [{ text: "Respond with the word 'READY'" }] }]
            }
        );
        console.log("PRO SUCCESS:", response.data.candidates[0].content.parts[0].text);
    } catch (err) {
        console.error("PRO FAIL:", err.response?.data || err.message);
    }
}

testPro();
