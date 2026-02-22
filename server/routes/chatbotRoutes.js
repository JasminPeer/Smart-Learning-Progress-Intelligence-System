const express = require('express');
const router = express.Router();
const axios = require('axios');
const SystemConfig = require('../models/SystemConfig');

// ─── Offline Smart Chatbot Engine ───────────────────────────────────────────
function generateOfflineResponse(message, aiName = 'Luna-AI', history = []) {
    const msg = message.toLowerCase().trim();

    // Greetings
    if (/\b(hi|hello|hey|hola|greetings|good morning|good evening|good afternoon)\b/.test(msg)) {
        return `Hello! I'm ${aiName}, your learning assistant on LearnIQ. How can I help you today? 😊`;
    }

    // How are you
    if (/how are you|how r u|how do you do|what.*up/.test(msg)) {
        return `I'm doing great, thank you for asking! 😊 I'm here to assist you. What can I help you with?`;
    }

    // Courses list
    if (/\b(course|courses|available|what.*learn|what.*study|what.*offer)\b/.test(msg)) {
        return `Here are the courses available on LearnIQ:\n\n**K-12 (Class 6–10):** Maths, Science, Social Science, English, Computer Science\n**Class 11–12:** Physics, Chemistry, Biology, Economics\n**Competitive Exams:** NEET Biology, JEE Physics\n**University:** B.Tech, MBA, B.Com, MCA, PG Data Science\n\nWould you like details on any specific course?`;
    }

    // Math
    if (/\b(math|maths|algebra|geometry|calculus|arithmetic|trigonometry)\b/.test(msg)) {
        return `Our **Mathematics (Class 6–10)** course covers Algebra, Geometry, Arithmetic, and more — with step-by-step video lessons.\n\nWould you like to know how to enroll?`;
    }

    // Science / competitive exams
    if (/\b(science|physics|chemistry|biology)\b/.test(msg)) {
        return `We offer science courses for different levels:\n• **Foundation Science** (Class 6–10)\n• **Physics, Chemistry, Biology** (Class 11–12)\n• **NEET Biology Masterclass** and **JEE Physics**\n\nAll include video lectures, theory, and practice quizzes. Which level are you interested in?`;
    }

    if (/\b(neet|jee)\b/.test(msg)) {
        return `Yes, we have dedicated exam preparation courses:\n• **NEET Biology Masterclass** — for medical entrance\n• **JEE Physics: Mechanics & Optics** — for engineering entrance\n\nBoth include structured lessons and practice questions. Would you like more details?`;
    }

    // Progress / Performance
    if (/\b(progress|performance|score|result|grade|marks)\b/.test(msg)) {
        return `Your progress is tracked automatically as you complete each lesson. You can view your completion percentage, quiz scores, and certificates from your **Student Dashboard**.`;
    }

    // Certificate
    if (/\b(certificate|certificates|achievement)\b/.test(msg)) {
        return `You earn a certificate when you complete 100% of a course. All your earned certificates can be viewed and downloaded from the **Achievements** page.`;
    }

    // Enrollment
    if (/\b(enroll|join|start a course|how to enroll|sign up for)\b/.test(msg)) {
        return `To enroll in a course:\n1. Go to the **Courses** page\n2. Select the course you want\n3. Click **Enroll Now**\n\nOnce enrolled, the course will appear in your dashboard.`;
    }

    // Profile / Settings
    if (/\b(profile|account|settings|password|edit profile)\b/.test(msg)) {
        return `You can update your profile details, photo, and settings from the **Profile** page after logging in.`;
    }

    // Study tips
    if (/\b(tip|tips|how to study|study strategy|focus|concentrate|learn faster|improve)\b/.test(msg)) {
        return `Here are a few effective study strategies:\n• **Pomodoro Technique** — study for 25 min, then take a 5 min break\n• **Active Recall** — test yourself instead of just re-reading notes\n• **Spaced Repetition** — review material after 1 day, 1 week, then 1 month\n• **Consistent schedule** — even 30 minutes daily adds up significantly\n\nWould you like tips for a specific subject?`;
    }

    // LearnIQ platform
    if (/\b(learniq|learn iq|platform|website|about)\b/.test(msg)) {
        return `LearnIQ is an online learning platform offering courses for school students, competitive exam aspirants, and university-level learners. It includes video lessons, progress tracking, and certificates.`;
    }

    // Help
    if (/\b(help|what can you do|what do you know|assist|guide)\b/.test(msg)) {
        return `I can help you with:\n• Information about available courses\n• How to enroll or navigate LearnIQ\n• Study tips and strategies\n• Tracking your progress and certificates\n\nJust ask me anything and I'll do my best to help! 😊`;
    }

    // Who are you
    if (/\b(who are you|what are you|your name|tell me about yourself)\b/.test(msg)) {
        return `I'm ${aiName}, an AI learning assistant for LearnIQ. I'm here to help you find courses, answer your questions, and support your learning journey. How can I assist you?`;
    }

    // Bye
    if (/\b(bye|goodbye|see you|later|exit|quit)\b/.test(msg)) {
        return `Goodbye! It was great assisting you. Feel free to come back anytime. Happy learning! 😊👋`;
    }

    // Thank you
    if (/\b(thank|thanks|thank you|thx|ty)\b/.test(msg)) {
        return `You're welcome! 😊 Let me know if there's anything else I can help you with.`;
    }

    // Default
    const defaults = [
        `Thank you for your question! Could you please be a bit more specific so I can give you the most helpful answer? I'm here to help with courses, enrollment, study tips, and navigating LearnIQ.`,
        `I want to make sure I give you the right answer. Could you rephrase your question? I can help with course info, study strategies, progress tracking, and more.`,
        `I'm not quite sure I understood that. Could you clarify what you're looking for? I'm happy to help with anything related to your learning on LearnIQ.`,
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
}

// ─── Routes ──────────────────────────────────────────────────────────────────

router.get('/config', async (req, res) => {
    try {
        let config = await SystemConfig.findOne({ key: 'ai_config' });
        if (!config) {
            config = { value: {
                name: 'Luna-AI',
                behaviour: 'Clever, wise, and slightly playful anime cat companion.',
                condition: 'Purring with intelligence (Operational)',
                wayOfSpeech: 'Uses subtle cat-themed puns and nyan-terminators.',
                requiredDetails: 'Focus on curriculum mastery and student encouragement.'
            }};
        }
        res.json(config.value);
    } catch (err) {
        res.status(500).json({ message: "Error fetching AI config" });
    }
});

router.post('/chat', async (req, res) => {
    try {
        const { message, history = [] } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        // Fetch AI Config from DB
        let aiConfig = { name: 'Luna-AI' };
        try {
            const configDoc = await SystemConfig.findOne({ key: 'ai_config' });
            if (configDoc && configDoc.value) aiConfig = configDoc.value;
        } catch (dbErr) {
            console.warn('[Chatbot] Using default config.');
        }

        const aiName = aiConfig.name || 'Luna-AI';

        // Always try Gemini if API key is available, fallback to offline
        if (apiKey && apiKey !== 'your_gemini_api_key_here') {
            const safeHistory = Array.isArray(history) ? history : [];

            const systemPrompt = `You are "${aiName}", an intelligent cat from a high-tech anime universe serving as the learning assistant for "LearnIQ" — a platform to learn and build careers.

Identity & Behaviour:
- ${aiConfig.behaviour || 'Clever, wise, and slightly playful anime cat companion.'}
- ${aiConfig.condition || 'Purring with intelligence (Operational)'}

Speech Style:
- ${aiConfig.wayOfSpeech || 'Uses subtle cat-themed puns. Example: "Greetings, Nyan!"'}

Core Knowledge:
- ${aiConfig.requiredDetails || 'Focus on curriculum mastery and student encouragement.'}
- Key Courses: K-12 subjects, NEET/JEE prep, B.Tech, MBA.

Guidelines:
- Be encouraging and slightly mysterious.
- Never say you are an AI. You are ${aiName}.`;

            const contents = safeHistory.map(msg => ({
                role: (msg.sender === 'user' || msg.role === 'user') ? 'user' : 'model',
                parts: [{ text: msg.payload?.text || msg.text || msg.message || '' }]
            }));
            contents.push({ role: 'user', parts: [{ text: message }] });

            // Try Gemini API with multiple fallbacks
            const models = ['gemini-flash-latest', 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-pro'];
            for (const model of models) {
                try {
                    const body = {
                        contents,
                        generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
                    };
                    if (model !== 'gemini-pro') {
                        body.system_instruction = { parts: [{ text: systemPrompt }] };
                    }
                    const response = await axios.post(
                        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
                        body,
                        { timeout: 8000 }
                    );
                    const aiResponse = response.data.candidates[0].content.parts[0].text;
                    return res.json({ text: aiResponse, isFallback: false });
                } catch (err) {
                    console.warn(`[Chatbot] ${model} failed: ${err.response?.status || err.message}`);
                    // If quota exceeded on ALL models, break and use offline
                    if (err.response?.status === 429 && model === models[models.length - 1]) break;
                }
            }
        }

        // Always-available offline fallback (no error, smart responses)
        console.log(`[Chatbot] Gemini API unavailable or limited. Switching to Offline Fallback for: ${message}`);
        const offlineResponse = generateOfflineResponse(message, aiName, history);
        return res.json({ text: offlineResponse, isFallback: true });

    } catch (error) {
        console.error('Chatbot Error:', error.message);
        // Never return an error to user — always send a response
        res.json({ text: "Nyaa! 🐱 I seem to have gotten my whiskers tangled. Could you rephrase that? I'm here to help with courses, study tips, and LearnIQ navigation!" });
    }
});

module.exports = router;
