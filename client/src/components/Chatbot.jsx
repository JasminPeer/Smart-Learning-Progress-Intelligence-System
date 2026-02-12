import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, X, Send, Bot, User, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I'm Luna. How can I help you with your studies today?", isBot: true }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Close chatbot when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Core EduGuide AI Logic - Professional, Teacher-like, Structured
        setTimeout(() => {
            let botResponse = "";
            const query = input.toLowerCase();

            // Behavior rules: Polite, no slang, structured (Intro -> Explanation -> Example -> Closing)

            if (query.includes("newton") || query.includes("law")) {
                botResponse = "Certainly! I would be pleased to explain Newton's First Law of Motion.\n\n" +
                    "This fundamental law states that an object will remain at rest or continue to move at a constant velocity in a straight line unless it is compelled to change that state by an external, unbalanced force. This concept is often referred to as inertia.\n\n" +
                    "For example, consider a book resting on a table. It will not move until you apply force by pushing it. Similarly, a ball rolling on a frictionless floor would continue indefinitely unless stopped by an obstacle.\n\n" +
                    "I hope this explanation clarifies the concept of inertia for you. Please let me know if you would like to explore this further.";
            } else if (query.includes("ug") || query.includes("bca") || query.includes("software")) {
                botResponse = "That is a very pertinent question regarding your academic path.\n\n" +
                    "If you intend to pursue a career in software development, undergraduate programs such as BTech in Computer Science, BCA (Bachelor of Computer Applications), or BSc in Information Technology are excellent choices. These courses provide a rigorous foundation in algorithms, system architecture, and modern programming languages.\n\n" +
                    "A common example is the BTech curriculum, which often includes hands-on projects that bridge the gap between theoretical computing and industry requirements.\n\n" +
                    "I am available to help you compare the specifics of these programs if you require more detail.";
            } else if (query.includes("neet") || query.includes("jee")) {
                botResponse = "Preparing for NEET or JEE requires a highly structured and disciplined approach to learning.\n\n" +
                    "Our platform provides specialized modules designed to address the complex requirements of these examinations. For JEE, we emphasize deep conceptual understanding of Physics and Mathematics, while our NEET modules focus on comprehensive Biology and Chemistry preparation using evidence-based teaching methods.\n\n" +
                    "An example of our strategy involves diagnostic assessments that identify your specific areas of academic vulnerability before recommending revision paths.\n\n" +
                    "I encourage you to begin with the introductory modules in our Course Catalog to build your confidence.";
            } else if (query.includes("certificate") || query.includes("how to earn")) {
                botResponse = "Earning a certificate of achievement is a commendable way to validate your academic progress.\n\n" +
                    "On the LearnIQ platform, you can earn a certificate by successfully completing all lesson modules within a course and achieving a passing grade on the final comprehensive assessment. Your progress is tracked in real-time on your student dashboard.\n\n" +
                    "Once you have fulfilled these requirements, the system will automatically generate your certificate, which will be accessible in your 'Achievements' gallery.\n\n" +
                    "I am here to support you in every step of your certification process.";
            } else if (query.includes("who are you") || query.includes("what is your name")) {
                botResponse = "I am Luna AI, an intelligent academic assistant designed for this online education platform.\n\n" +
                    "My primary role is to answer your academic inquiries clearly and professionally, adapting my explanations to your specific level of study, whether you are in School, preparing for NEET/JEE, or pursuing UG/PG degrees.\n\n" +
                    "I function much like a dedicated teacher, providing step-by-step guidance and encouragement to ensure your learning objectives are met.\n\n" +
                    "How may I assist you with your studies at this time?";
            } else if (query.includes("hello") || query.includes("hi") || query.includes("greetings")) {
                botResponse = "Greetings! I am Luna AI, your academic companion.\n\n" +
                    "I am here to ensure that your experience on the LearnIQ platform is intellectually rewarding and efficient. I can help with subject doubts, course guidance, and preparation strategies for various competitive exams.\n\n" +
                    "For instance, if you are struggling with a specific mathematical proof, I can break it down into manageable steps for you.\n\n" +
                    "Please let me know which subject or topic we should address today.";
            } else if (query.includes("b.com") || query.includes("btech") || query.includes("mba")) {
                botResponse = "Indeed, the platform offers comprehensive curricula for B.Com, B.Tech, and MBA programs.\n\n" +
                    "These courses are structured to provide both foundational knowledge and advanced practical skills relevant to their respective industries. Our B.Com modules cover financial accounting and business law, while the MBA tracks focus on strategic management and leadership.\n\n" +
                    "You can view the full curriculum for each of these degrees in our main Course Catalog section.\n\n" +
                    "Is there a specific program details you would like me to elaborate on?";
            } else {
                botResponse = `Thank you for your inquiry regarding "${input}".\n\n` +
                    "While I am primarily specialized in the LearnIQ curriculum and general academic concepts, I will endeavor to provide guidance. If your question lies outside the current syllabus, I recommend consulting our Help Center or the relevant course documentation for more precise information.\n\n" +
                    "As an example, many students find that navigating the 'System' or 'Courses' documentation provides immediate answers to procedural questions.\n\n" +
                    "I remain at your service for any further academic assistance.";
            }

            setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
            setIsTyping(false);
        }, 1200);
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            zIndex: 9999,
            fontFamily: "'Inter', sans-serif"
        }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        style={{
                            width: '380px', // Slightly wider for professional text
                            height: '520px',
                            backgroundColor: 'white',
                            borderRadius: '24px',
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            marginBottom: '15px',
                            border: '1px solid #E2E8F0'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '20px',
                            background: 'linear-gradient(135deg, #065F46 0%, #059669 100%)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '6px',
                                    boxShadow: '0 0 15px rgba(255,255,255,0.5)',
                                    border: '2px solid #D1FAE5',
                                    overflow: 'hidden'
                                }}>
                                    <img src="/luna-bot.svg" alt="Luna" style={{ width: '35px', height: '35px' }} />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Luna AI</h3>
                                    <span style={{ fontSize: '0.7rem', opacity: 0.9 }}>Professional Learning Assistant</span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '5px' }}>
                                <X size={24} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div style={{
                            flexGrow: 1,
                            padding: '20px',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            backgroundColor: '#FBFDFF'
                        }}>
                            {messages.map((msg, index) => (
                                <div key={index} style={{
                                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '90%',
                                    display: 'flex',
                                    gap: '10px',
                                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
                                }}>
                                    {msg.role === 'bot' && (
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            backgroundColor: '#ECFDF5',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '4px',
                                            flexShrink: 0,
                                            border: '1px solid #D1FAE5',
                                            boxShadow: '0 2px 8px rgba(5, 150, 105, 0.1)'
                                        }}>
                                            <img src="/luna-bot.svg" alt="Luna" style={{ width: '100%', borderRadius: '50%' }} />
                                        </div>
                                    )}
                                    <div style={{
                                        padding: '12px 16px',
                                        borderRadius: msg.role === 'user' ? '16px 16px 2px 16px' : '2px 16px 16px 16px',
                                        backgroundColor: msg.role === 'user' ? '#059669' : 'white',
                                        color: msg.role === 'user' ? 'white' : '#334155',
                                        fontSize: '0.875rem',
                                        lineHeight: '1.6',
                                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                        border: '1px solid #F1F5F9',
                                        whiteSpace: 'pre-line' // Preserve line breaks for structure
                                    }}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        backgroundColor: '#ECFDF5',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '4px',
                                        border: '1px solid #D1FAE5'
                                    }}>
                                        <img src="/luna-bot.svg" alt="Luna" style={{ width: '100%', borderRadius: '50%' }} />
                                    </div>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <div style={{ width: '5px', height: '5px', backgroundColor: '#059669', borderRadius: '50%', animation: 'bounce 1s infinite' }}></div>
                                        <div style={{ width: '5px', height: '5px', backgroundColor: '#059669', borderRadius: '50%', animation: 'bounce 1.2s infinite' }}></div>
                                        <div style={{ width: '5px', height: '5px', backgroundColor: '#059669', borderRadius: '50%', animation: 'bounce 1.4s infinite' }}></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions / Suggestion Chips */}
                        <div style={{
                            padding: '12px 20px',
                            display: 'flex',
                            gap: '10px',
                            overflowX: 'auto',
                            backgroundColor: 'white',
                            borderTop: '1px solid #F1F5F9'
                        }}>
                            {[
                                { label: "📘 Subject Doubt", text: "I have a question about a specific subject concept." },
                                { label: "🧪 NEET/JEE Help", text: "Can you provide guidance for NEET/JEE preparation?" },
                                { label: "🎓 UG/PG Paths", text: "What are the recommended paths for UG/PG students?" },
                                { label: "📝 Exam Tips", text: "Can you offer effective strategies for exam preparation?" }
                            ].map((suggest, i) => (
                                <button
                                    key={i}
                                    onClick={() => setInput(suggest.text)}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '12px',
                                        border: '1px solid #059669',
                                        color: '#059669',
                                        backgroundColor: '#F0FDF4',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {suggest.label}
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} style={{ padding: '15px 20px', borderTop: '1px solid #F1F5F9', display: 'flex', gap: '12px', backgroundColor: 'white' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="State your academic query..."
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    outline: 'none',
                                    fontSize: '0.9rem',
                                    color: '#334155'
                                }}
                            />
                            <button type="submit" style={{
                                backgroundColor: '#059669',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '8px 16px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Send size={20} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px', // Closer
                position: 'relative'
            }}>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            color: '#065F46',
                            fontWeight: 900,
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            pointerEvents: 'none',
                            whiteSpace: 'nowrap',
                            backgroundColor: 'white',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(6, 95, 70, 0.15)',
                            border: '1px solid #ECFDF5'
                        }}
                    >
                        Luna
                    </motion.div>
                )}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                        y: [0, -10, 0],
                        boxShadow: [
                            '0 0 25px rgba(5, 150, 105, 0.4)',
                            '0 0 50px rgba(5, 150, 105, 0.6)',
                            '0 0 25px rgba(5, 150, 105, 0.4)'
                        ]
                    }}
                    transition={{
                        y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                        boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
                    }}
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        width: '82px',
                        height: '82px',
                        borderRadius: '50%', // Circle Toggle
                        backgroundColor: 'white',
                        border: '3px solid #D1FAE5',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                    }}
                >
                    {isOpen ? (
                        <X size={38} color="#065F46" />
                    ) : (
                        <div style={{ padding: '10px' }}>
                            <img
                                src="/luna-bot.svg"
                                alt="Luna"
                                style={{
                                    width: '55px',
                                    height: '55px',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                    )}
                </motion.button>
            </div>
        </div>
    );
};

export default Chatbot;
