const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

async function testRoute() {
    dotenv.config({ path: path.join(__dirname, '.env') });
    const apiKey = process.env.GEMINI_API_KEY;
    const systemPrompt = "You are Luna.";
    const userMessage = "Hello";
    
    // Exact format from chatbotRoutes.js
    const contents = [{
        role: "user",
        parts: [{ text: userMessage }]
    }];

    try {
        console.log("Testing Gemini 2.5 Flash...");
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                system_instruction: {
                    parts: [{ text: systemPrompt }]
                },
                contents: contents
            }
        );
        console.log("SUCCESS:", response.data.candidates[0].content.parts[0].text);
    } catch (err) {
        console.error("FLASH FAIL:", err.response?.data || err.message);
        
        console.log("Trying Pro Fallback...");
        try {
             // Basic format for older/other models
             const proResp = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
                { contents: contents }
            );
            console.log("PRO SUCCESS:", proResp.data.candidates[0].content.parts[0].text);
        } catch (proErr) {
            console.error("PRO FAIL:", proErr.response?.data || proErr.message);
        }
    }
}

testRoute();
