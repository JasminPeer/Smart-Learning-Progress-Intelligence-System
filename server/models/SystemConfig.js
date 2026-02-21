const mongoose = require('mongoose');

const systemConfigSchema = mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        default: 'ai_config'
    },
    value: {
        name: { type: String, default: 'Luna-AI' },
        behaviour: { type: String, default: 'Clever, wise, and slightly playful anime cat companion. Act as a guide who provides insightful hints while maintaining a mysterious yet helpful demeanor.' },
        condition: { type: String, default: 'Purring with intelligence (Operational)' },
        wayOfSpeech: { type: String, default: 'Uses subtle cat-themed puns and polite nyan-terminators. "Greetings, Nyan! Ready to sharpen your claws on some new knowledge today?"' },
        requiredDetails: { type: String, default: 'Focus on curriculum mastery, student encouragement, and logical reasoning. Act as a superior yet supportive feline mentor.' },
        apiVersion: { type: String, default: 'v1beta' }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SystemConfig', systemConfigSchema);
