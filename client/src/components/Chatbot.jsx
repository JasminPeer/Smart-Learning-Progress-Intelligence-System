import { useState, useEffect, useRef, Component, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthContext from '../auth/AuthContext';
import api from '../utils/api';

// Error Boundary Component
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Chatbot Error Trace:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    position: 'fixed', bottom: '120px', right: '40px',
                    padding: '15px', backgroundColor: 'white', border: '2px solid #fee2e2',
                    borderRadius: '12px', boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                    zIndex: 10001, color: '#b91c1c', maxWidth: '300px'
                }}>
                    <h5 style={{ margin: '0 0 5px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <X size={16} />
                        Chatbot Error
                    </h5>
                    <p style={{ fontSize: '11px', margin: '5px 0 10px 0', opacity: 0.8 }}>
                        {this.state.error?.message || "An unexpected error occurred."}
                    </p>
                    <button
                        onClick={() => {
                            this.setState({ hasError: false });
                            window.location.reload();
                        }}
                        style={{
                            width: '100%', padding: '6px',
                            backgroundColor: '#ef4444', color: 'white',
                            border: 'none', borderRadius: '4px', cursor: 'pointer',
                            fontSize: '11px', fontWeight: 'bold'
                        }}
                    >
                        Restart Chatbot
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

// Custom Chat Content Component
const ChatContent = ({ localMessages, setLocalMessages, isTyping, setIsTyping, aiConfig, isFreeMode, setIsFreeMode }) => {
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [localMessages, isTyping]);

    const handleSend = async (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (!inputValue.trim() || isTyping) return;

        const currentInput = inputValue;
        setInputValue("");

        const userMsg = {
            id: 'user-' + Date.now(),
            text: currentInput,
            sender: 'user',
            timestamp: Date.now()
        };

        // Add user message to state
        setLocalMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        try {
            console.log("[DEBUG] Chatbot - Sending message:", currentInput);
            const { data } = await api.post('/chatbot/chat', {
                message: currentInput,
                history: localMessages.map(m => ({
                    sender: m.sender === 'user' ? 'user' : 'model',
                    text: m.text
                }))
            });
            console.log("[DEBUG] Chatbot - Received response:", data);

            // Set Free Mode status based on fallback flag
            if (setIsFreeMode) setIsFreeMode(!!data.isFallback);

            if (!data || !data.text) {
                console.error("[DEBUG] Chatbot - Response missing text:", data);
                throw new Error("No response text from AI");
            }

            const aiMsg = {
                id: 'ai-' + Date.now(),
                text: data.text,
                sender: 'bot',
                isIncoming: true,
                timestamp: Date.now()
            };
            setLocalMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("Gemini API Error Detail:", error.response?.data || error.message);
            const errMsg = {
                id: 'error-' + Date.now(),
                text: "I'm having trouble connecting to my brain right now. Please try again in a moment!",
                sender: 'bot',
                isIncoming: true,
                timestamp: Date.now(),
                isError: true
            };
            setLocalMessages(prev => [...prev, errMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend(e);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minHeight: 0,
            backgroundColor: '#f3f4f6'
        }}>
            {/* Messages Area */}
            <div className="chat-messages" style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                scrollBehavior: 'smooth'
            }}>
                {(!localMessages || localMessages.length === 0) && (
                    <div style={{
                        textAlign: 'center',
                        margin: 'auto 0',
                        color: '#6B7280',
                        fontSize: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        padding: '20px'
                    }}>
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ fontSize: '3rem' }}
                        >
                            🐱
                        </motion.div>
                        <h4 style={{ color: '#065F46', margin: 0 }}>Hi! I'm {aiConfig.name}.</h4>
                        <p style={{ margin: 0 }}>{aiConfig.wayOfSpeech.length > 5 ? aiConfig.wayOfSpeech : "I'm here to help with your learning journey."}</p>
                        <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Ask me anything about your courses!</p>
                    </div>
                )}

                {localMessages.map((msg) => {
                    const isBot = msg.sender === 'bot';
                    return (
                        <div key={msg.id} style={{
                            alignSelf: isBot ? 'flex-start' : 'flex-end',
                            maxWidth: '85%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: isBot ? 'flex-start' : 'flex-end'
                        }}>
                            {isBot && (
                                <span style={{
                                    fontSize: '0.7rem',
                                    color: '#065F46',
                                    marginBottom: '4px',
                                    marginLeft: '4px',
                                    fontWeight: 800
                                }}>
                                    {aiConfig.name}
                                </span>
                            )}
                            <div style={{
                                backgroundColor: isBot ? 'white' : '#059669',
                                color: isBot ? (msg.isError ? '#ef4444' : '#1F2937') : 'white',
                                padding: '10px 14px',
                                borderRadius: '12px',
                                borderBottomLeftRadius: isBot ? '2px' : '12px',
                                borderBottomRightRadius: isBot ? '12px' : '2px',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                fontSize: '0.95rem',
                                lineHeight: '1.4',
                                wordBreak: 'break-word'
                            }}>
                                {msg.text}
                            </div>
                        </div>
                    );
                })}

                {isTyping && (
                    <div style={{
                        alignSelf: 'flex-start',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                    }}>
                        <span style={{ fontSize: '0.7rem', color: '#6B7280', marginLeft: '4px', fontWeight: 600 }}>
                            {aiConfig.name} is thinking...
                        </span>
                        <div style={{
                            display: 'flex',
                            gap: '4px',
                            padding: '12px 16px',
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            borderBottomLeftRadius: '2px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            width: 'fit-content'
                        }}>
                            <span className="dot" style={{ width: '6px', height: '6px', backgroundColor: '#9CA3AF', borderRadius: '50%', animation: 'bounce 1s infinite' }}></span>
                            <span className="dot" style={{ width: '6px', height: '6px', backgroundColor: '#9CA3AF', borderRadius: '50%', animation: 'bounce 1s infinite 0.2s' }}></span>
                            <span className="dot" style={{ width: '6px', height: '6px', backgroundColor: '#9CA3AF', borderRadius: '50%', animation: 'bounce 1s infinite 0.4s' }}></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{
                padding: '12px',
                backgroundColor: 'white',
                borderTop: '1px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexShrink: 0
            }}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    disabled={isTyping}
                    style={{
                        flexGrow: 1,
                        padding: '10px 14px',
                        borderRadius: '20px',
                        border: '1px solid #D1D5DB',
                        outline: 'none',
                        fontSize: '0.95rem'
                    }}
                />
                <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                    style={{
                        backgroundColor: '#059669',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: (inputValue.trim() && !isTyping) ? 'pointer' : 'default',
                        opacity: (inputValue.trim() && !isTyping) ? 1 : 0.6,
                        transition: 'all 0.2s'
                    }}
                >
                    <Send size={18} />
                </button>
            </div>
            <div style={{ padding: '4px 12px', backgroundColor: 'white', textAlign: 'center', borderTop: '1px solid #F3F4F6' }}>
                <span style={{ fontSize: '0.65rem', color: '#9CA3AF', fontWeight: 500, letterSpacing: '0.05em' }}>
                    POWERED BY GOOGLE GEMINI AI
                </span>
            </div>

            <style>{`
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                }
            `}</style>
        </div>
    );
};

const ChatbotInner = () => {
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [localMessages, setLocalMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [aiConfig, setAiConfig] = useState({ name: 'Luna-AI', wayOfSpeech: '' });
    const [isFreeMode, setIsFreeMode] = useState(false);

    // Fetch AI Config on mount
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const { data } = await api.get('/chatbot/config');
                if (data && typeof data === 'object') {
                    setAiConfig(prev => ({ ...prev, ...data }));
                }
            } catch (err) {
                console.warn("[Chatbot] Failed to fetch config, using defaults.");
            }
        };
        fetchConfig();
    }, []);

    // Close on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const toggleBot = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setIsOpen(!isOpen);
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
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        style={{
                            position: 'absolute',
                            bottom: '90px',
                            right: '0',
                            width: '360px',
                            height: '550px',
                            backgroundColor: 'white',
                            borderRadius: '24px',
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            border: '1px solid rgba(0,0,0,0.05)',
                            transformOrigin: 'calc(100% - 36px) bottom'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '16px 20px',
                            background: 'linear-gradient(135deg, #064E3B 0%, #059669 100%)',
                            color: 'white',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            flexShrink: 0
                        }}>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setIsOpen(false);
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '20px',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    padding: '5px',
                                    zIndex: 10
                                }}
                            >
                                <X size={20} />
                            </button>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                width: '100%',
                                textAlign: 'center',
                                position: 'relative'
                            }}>
                                <div style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '10px 0'
                                }}>
                                    <motion.div
                                        animate={{
                                            boxShadow: [
                                                "0 0 10px rgba(52, 211, 153, 0.3)",
                                                "0 0 25px rgba(52, 211, 153, 0.6)",
                                                "0 0 10px rgba(52, 211, 153, 0.3)"
                                            ],
                                            borderColor: [
                                                "rgba(255, 255, 255, 0.4)",
                                                "rgba(255, 255, 255, 0.8)",
                                                "rgba(255, 255, 255, 0.4)"
                                            ]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{
                                            position: 'relative',
                                            display: 'inline-flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '100px',
                                            height: '100px',
                                            borderRadius: '50%',
                                            border: '2px solid rgba(255,255,255,0.4)',
                                            background: 'rgba(255,255,255,0.05)',
                                            backdropFilter: 'blur(4px)',
                                            zIndex: 2
                                        }}
                                    >
                                        <div style={{
                                            position: 'relative',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '10px'
                                        }}>
                                            <div style={{
                                                width: '56px',
                                                height: '56px',
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: '6px',
                                                marginBottom: '8px',
                                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                                border: '2px solid rgba(52, 211, 153, 0.3)'
                                            }}>
                                                <img src="/luna-bot.svg" alt="Luna" style={{ width: '38px', height: '38px', display: 'block' }} />
                                            </div>
                                            <motion.h3
                                                animate={{
                                                    textShadow: [
                                                        "0 0 5px #fff, 0 0 10px #059669",
                                                        "0 0 15px #fff, 0 0 25px #059669",
                                                        "0 0 5px #fff, 0 0 10px #059669"
                                                    ]
                                                }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                style={{
                                                    margin: 0,
                                                    fontSize: '1rem',
                                                    fontWeight: 900,
                                                    lineHeight: '1.2',
                                                    color: 'white',
                                                    textAlign: 'center',
                                                    zIndex: 5
                                                }}
                                            >
                                                {aiConfig.name}
                                            </motion.h3>
                                        </div>

                                        {[...Array(8)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                style={{
                                                    position: 'absolute',
                                                    width: '4px',
                                                    height: '4px',
                                                    backgroundColor: '#fbbf24',
                                                    borderRadius: '50%',
                                                    top: '50%',
                                                    left: '50%',
                                                }}
                                                animate={{
                                                    x: [0, Math.cos(i * (Math.PI / 4)) * 70],
                                                    y: [0, Math.sin(i * (Math.PI / 4)) * 70],
                                                    opacity: [1, 0],
                                                    scale: [1, 0]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: i * 0.2,
                                                    ease: "easeOut"
                                                }}
                                            />
                                        ))}

                                        <span style={{
                                            fontSize: '0.6rem',
                                            opacity: 0.9,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em',
                                            marginTop: '6px',
                                            color: isFreeMode ? '#fbbf24' : '#D1FAE5',
                                            fontWeight: 700
                                        }}>
                                            {isFreeMode ? 'Free Mode (Offline)' : 'Premium AI (Online)'}
                                        </span>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Chat Content */}
                        <ErrorBoundary>
                            <ChatContent
                                localMessages={localMessages}
                                setLocalMessages={setLocalMessages}
                                isTyping={isTyping}
                                setIsTyping={setIsTyping}
                                aiConfig={aiConfig}
                                isFreeMode={isFreeMode}
                                setIsFreeMode={setIsFreeMode}
                            />
                        </ErrorBoundary>

                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button Container */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
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
                            backgroundColor: 'white',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            marginBottom: '10px',
                            border: '1px solid #ECFDF5',
                            position: 'relative'
                        }}
                    >
                        <motion.span
                            animate={{
                                textShadow: [
                                    "0 0 2px #fff, 0 0 5px #059669",
                                    "0 0 5px #fff, 0 0 10px #059669",
                                    "0 0 2px #fff, 0 0 5px #059669"
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {aiConfig.name}
                        </motion.span>

                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    width: '3px',
                                    height: '3px',
                                    backgroundColor: '#fbbf24',
                                    borderRadius: '50%',
                                    top: '50%',
                                    left: '50%',
                                }}
                                animate={{
                                    x: [0, (i % 2 === 0 ? 1 : -1) * (Math.random() * 30 + 15)],
                                    y: [0, (i < 3 ? 1 : -1) * (Math.random() * 30 + 15)],
                                    opacity: [1, 0],
                                    scale: [1.5, 0]
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeOut"
                                }}
                            />
                        ))}
                    </motion.div>
                )}

                <div style={{ position: 'relative' }}>
                    {!isOpen && (
                        <>
                            <motion.div
                                animate={{
                                    scale: [1, 1.6],
                                    opacity: [0.6, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeOut"
                                }}
                                style={{
                                    position: 'absolute',
                                    top: 0, left: 0, right: 0, bottom: 0,
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(5, 150, 105, 0.4)',
                                    zIndex: 0
                                }}
                            />
                            <motion.div
                                animate={{
                                    scale: [1, 1.4],
                                    opacity: [0.4, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeOut",
                                    delay: 0.5
                                }}
                                style={{
                                    position: 'absolute',
                                    top: 0, left: 0, right: 0, bottom: 0,
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(5, 150, 105, 0.3)',
                                    zIndex: 0
                                }}
                            />
                        </>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(5, 150, 105, 0.6)' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleBot}
                        style={{
                            width: '72px',
                            height: '72px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            border: '4px solid #D1FAE5',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 15px rgba(5, 150, 105, 0.4), 0 8px 30px rgba(0,0,0,0.2)',
                            zIndex: 10,
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {isOpen ? (
                            <X size={32} color="#065F46" />
                        ) : (
                            <div style={{ padding: '4px', width: '50px', height: '50px' }}>
                                <img src="/luna-bot.svg" alt="Luna" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                        )}
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

const Chatbot = () => {
    return (
        <ErrorBoundary>
            <ChatbotInner />
        </ErrorBoundary>
    );
};

export default Chatbot;
