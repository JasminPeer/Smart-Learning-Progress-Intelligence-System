import { useState } from 'react';
import Footer from '../components/layout/Footer';
import { ChevronDown, ChevronUp, Wifi, BookOpen, AlertCircle } from 'lucide-react';

const HelpCenter = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="container" style={{ flexGrow: 1, padding: '60px 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '15px' }}>How can we help?</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Search for solutions or browse common topics below.</p>
                </div>

                <div className="grid-cols-2" style={{ maxWidth: '1000px', margin: '0 auto', gap: '40px' }}>

                    {/* Topic 1: Using the App */}
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                            <div style={{ padding: '10px', background: 'var(--secondary-light)', borderRadius: '10px', color: 'var(--secondary)' }}>
                                <BookOpen size={24} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem' }}>Using the App</h2>
                        </div>
                        <FaqItem
                            question="How do I access my dashboard?"
                            answer="Simply log in with your credentials. Based on your role (Student, Instructor, Admin), you will be automatically redirected to your personalized dashboard."
                        />
                        <FaqItem
                            question="Where can I find my courses?"
                            answer="Navigate to the 'My Courses' tab in the sidebar. All your enrolled courses and progress will be listed there."
                        />
                        <FaqItem
                            question="How do I submit assignments?"
                            answer="Go to the specific course page. Under 'Assignments', click on the pending task and use the upload button to submit your file."
                        />
                    </div>

                    {/* Topic 2: Troubleshooting */}
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                            <div style={{ padding: '10px', background: '#FEE2E2', borderRadius: '10px', color: 'var(--error)' }}>
                                <AlertCircle size={24} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem' }}>Troubleshooting</h2>
                        </div>
                        <FaqItem
                            question="I'm facing internet/connectivity issues?"
                            answer="If you lose internet connection, LearnIQ will save your local progress where possible. Please check your Wifi router or mobile data. Try refreshing the page once connectivity is restored."
                        />
                        <FaqItem
                            question="Video content is buffering?"
                            answer="Lower the video quality using the settings gear icon on the player. Ensure no other background downloads are consuming your bandwidth."
                        />
                        <FaqItem
                            question="Forgot my password?"
                            answer="Click on 'Forgot Password' on the login screen. We will send a reset link to your registered email address."
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: 500 }}
            >
                {question}
                {isOpen ? <ChevronUp size={18} color="var(--text-secondary)" /> : <ChevronDown size={18} color="var(--text-secondary)" />}
            </div>
            {isOpen && <p style={{ marginTop: '10px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{answer}</p>}
        </div>
    );
};

export default HelpCenter;
