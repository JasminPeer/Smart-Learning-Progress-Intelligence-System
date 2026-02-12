import { useState, useContext, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../data/curriculum';
import AuthContext from '../auth/AuthContext';
import axios from 'axios';
import { Check, X, Award, Download, ArrowLeft, RefreshCw, Star, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Assessment = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [course, setCourse] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [loading, setLoading] = useState(false);

    const certificateRef = useRef();

    useEffect(() => {
        const loadAssessment = async () => {
            try {
                // 1. Try to find in static data first
                const staticCourse = courses.find(c => c.id === courseId);

                // 2. Try to fetch dynamic data from DB
                const token = localStorage.getItem('token');
                let dynamicCourse = null;
                try {
                    const { data } = await axios.get('/api/courses', {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    const dbCourses = Array.isArray(data) ? data : (data?.courses || []);

                    // Find by ID or matching slug/title
                    dynamicCourse = dbCourses.find(c =>
                        c._id === courseId ||
                        c.title?.toLowerCase().replace(/ /g, '-') === courseId
                    );
                } catch (e) {
                    console.warn("API courses fetch failed:", e);
                }

                if (dynamicCourse && dynamicCourse.assessment?.questions?.length > 0) {
                    setCourse(dynamicCourse);
                } else if (staticCourse) {
                    setCourse(staticCourse);
                }
            } catch (error) {
                console.error("Assessment preparation failed:", error);
                const staticCourse = courses.find(c => c.id === courseId);
                if (staticCourse) setCourse(staticCourse);
            } finally {
                setLoadingData(false);
            }
        };
        loadAssessment();
    }, [courseId]);

    // Safety check during loading
    if (loadingData) return <div style={{ padding: '100px', textAlign: 'center' }}><div className="loader"></div><p>Syncing Assessment...</p></div>;
    if (!course || !course.assessment) return <div style={{ padding: '40px', textAlign: 'center' }}>Assessment not found or no questions uploaded yet.</div>;

    const handleAnswerOptionClick = (option) => {
        if (isAnswered) return;

        setSelectedOption(option);
        setIsAnswered(true);

        const isCorrect = option === course.assessment.questions[currentQuestion].answer;
        if (isCorrect) {
            setScore(prev => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < course.assessment.questions.length) {
            setCurrentQuestion(nextQuestion);
            setIsAnswered(false);
            setSelectedOption(null);
        } else {
            setShowScore(true);
            saveResult();
        }
    };

    const saveResult = async () => {
        const percentage = (score / course.assessment.questions.length) * 100;

        if (percentage >= course.assessment.passingScore) {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                await axios.post('/api/profile/certificate',
                    { courseId, courseName: course.title, score: Math.round(percentage) },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                alert("Congratulations! Assessment passed and certificate awarded. Check your Achievements page!");
            } catch (error) {
                console.error("Failed to save certificate", error);
                const serverMsg = error.response?.data?.message || error.message;
                alert("Result saved, but certificate generation failed: " + serverMsg);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDownload = () => {
        const certElement = document.createElement('div');
        certElement.style.cssText = `
            width: 1000px; padding: 60px; border: 20px solid #F1F5F9; 
            text-align: center; font-family: 'Segoe UI', serif; background: white;
            color: #1E293B; box-shadow: 0 0 50px rgba(0,0,0,0.1);
        `;
        certElement.innerHTML = `
            <div style="border: 2px solid #4F46E5; padding: 60px; position: relative;">
                <div style="margin-bottom: 30px;">
                    <h1 style="font-size: 50px; color: #4F46E5; margin-bottom: 5px; letter-spacing: 5px; font-weight: 800;">LEARNIQ ACADEMY</h1>
                    <p style="color: #64748B; font-size: 18px; text-transform: uppercase; letter-spacing: 2px;">Excellence in Online Education</p>
                </div>
                
                <p style="font-size: 22px; color: #475569; margin-top: 40px;">This is to certify that</p>
                <h2 style="font-size: 45px; margin: 20px 0; border-bottom: 2px solid #E2E8F0; display: inline-block; padding-bottom: 10px; color: #1E293B;">${user?.name || "The Learner"}</h2>
                
                <p style="font-size: 22px; color: #475569;">has successfully completed the evaluation for the course</p>
                <h3 style="font-size: 32px; color: #4F46E5; margin: 20px 0;">${course.title}</h3>
                
                <div style="margin-top: 80px; display: grid; grid-template-columns: 1fr 1fr 1fr; align-items: flex-end;">
                    <div style="text-align: center;">
                        <div style="font-style: italic; color: #1E293B; font-size: 1.2rem; margin-bottom: 5px;">Jasmin Peer</div>
                        <div style="width: 150px; height: 1px; background: #94A3B8; margin: 0 auto 10px;"></div>
                        <p style="font-size: 14px; color: #64748B;">Academics Director</p>
                    </div>
                    <div>
                        <div style="width: 100px; height: 100px; border: 5px double #4F46E5; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; color: #4F46E5; font-weight: bold; font-size: 24px;">LQ</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-style: italic; color: #1E293B; font-size: 1.2rem; margin-bottom: 5px;">${new Date().toLocaleDateString()}</div>
                        <div style="width: 150px; height: 1px; background: #94A3B8; margin: 0 auto 10px;"></div>
                        <p style="font-size: 14px; color: #64748B;">Date Issued</p>
                    </div>
                </div>
            </div>
        `;

        const blob = new Blob([certElement.outerHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Certificate_${course.title.replace(/ /g, '_')}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const percentage = Math.round((score / course.assessment.questions.length) * 100);
    const isPassed = percentage >= course.assessment.passingScore;

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#F8FAFC', padding: '20px' }}>
            <AnimatePresence mode='wait'>
                {!showScore ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="card" style={{ maxWidth: '700px', width: '100%', padding: '50px', position: 'relative', overflow: 'hidden' }}
                    >
                        {/* Progress Header */}
                        <div style={{ position: 'absolute', top: 0, left: 0, height: '6px', width: '100%', backgroundColor: '#E2E8F0' }}>
                            <div style={{ width: `${((currentQuestion + 1) / course.assessment.questions.length) * 100}%`, height: '100%', backgroundColor: 'var(--primary)', transition: 'width 0.3s' }}></div>
                        </div>

                        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <button
                                    onClick={() => navigate(`/learn/${courseId}`)}
                                    style={{
                                        backgroundColor: '#F1F5F9',
                                        border: 'none',
                                        borderRadius: '10px',
                                        padding: '10px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <ArrowLeft size={20} color="var(--primary)" />
                                </button>
                                <div>
                                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-dark)', margin: 0 }}>{course.assessment.title}</h1>
                                    <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '5px', margin: 0 }}>Attempt required: {course.assessment.passingScore}% to pass</p>
                                </div>
                            </div>
                            <div style={{ backgroundColor: '#F1F5F9', padding: '10px 15px', borderRadius: '10px', fontWeight: 700, color: 'var(--primary)' }}>
                                Question {currentQuestion + 1}/{course.assessment.questions.length}
                            </div>
                        </div>

                        <div style={{ marginBottom: '40px', textAlign: 'left' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '30px', lineHeight: 1.5, color: '#1E293B' }}>{course.assessment.questions[currentQuestion].question}</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {course.assessment.questions[currentQuestion].options.map((option, index) => {
                                    let backgroundColor = 'white';
                                    let borderColor = '#E2E8F0';
                                    let icon = null;
                                    const optionLetter = String.fromCharCode(65 + index); // A, B, C, D, E, F

                                    if (isAnswered) {
                                        if (option === course.assessment.questions[currentQuestion].answer) {
                                            backgroundColor = '#DCFCE7';
                                            borderColor = '#10B981';
                                            icon = <Check size={18} color="#10B981" />;
                                        } else if (option === selectedOption) {
                                            backgroundColor = '#FEE2E2';
                                            borderColor = '#EF4444';
                                            icon = <X size={18} color="#EF4444" />;
                                        }
                                    }

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswerOptionClick(option)}
                                            style={{
                                                padding: '16px 20px',
                                                borderRadius: '12px',
                                                border: `2px solid ${borderColor}`,
                                                backgroundColor: backgroundColor,
                                                textAlign: 'left',
                                                cursor: isAnswered ? 'default' : 'pointer',
                                                fontSize: '1rem',
                                                transition: 'all 0.2s',
                                                fontWeight: option === selectedOption ? 700 : 500,
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                boxShadow: option === selectedOption ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none'
                                            }}
                                            disabled={isAnswered}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <span style={{
                                                    width: '32px', height: '32px', borderRadius: '8px',
                                                    backgroundColor: option === selectedOption ? 'var(--primary)' : '#F1F5F9',
                                                    color: option === selectedOption ? 'white' : '#64748B',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontWeight: 700, fontSize: '0.9rem'
                                                }}>
                                                    {optionLetter}
                                                </span>
                                                {option}
                                            </div>
                                            {icon}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {isAnswered && (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={handleNextQuestion}
                                className="btn btn-primary"
                                style={{ width: '100%', padding: '15px', fontSize: '1.1rem', borderRadius: '12px', marginTop: '20px' }}
                            >
                                {currentQuestion === course.assessment.questions.length - 1 ? 'Finish & Generate Certificate' : 'Next Question'}
                            </motion.button>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="card" style={{ maxWidth: '800px', width: '100%', padding: '0', textAlign: 'center', overflow: 'hidden' }}
                    >
                        {isPassed ? (
                            <div>
                                <div style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)', padding: '60px 40px', color: 'white' }}>
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ type: 'spring', damping: 10 }}>
                                        <Award size={100} style={{ margin: '0 auto 20px', color: '#FACC15' }} />
                                    </motion.div>
                                    <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'white' }}>Congratulations!</h2>
                                    <p style={{ opacity: 0.9, fontSize: '1.2rem' }}>You have successfully completed the assessment for <strong>{course.title}</strong></p>
                                </div>

                                <div style={{ padding: '40px' }}>
                                    {/* Professional Certificate Preview */}
                                    <div style={{ padding: '40px', border: '15px solid #F1F5F9', position: 'relative', backgroundColor: 'white', backgroundImage: 'radial-gradient(#E2E8F0 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                                        <div style={{ border: '2px solid #4F46E5', padding: '40px', position: 'relative' }}>
                                            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '0 20px' }}>
                                                <Brain size={40} color="#4F46E5" />
                                            </div>
                                            <h4 style={{ color: '#4F46E5', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.9rem', marginBottom: '30px', fontWeight: 800 }}>LearnIQ Academy</h4>

                                            <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '1.1rem' }}>This certificate of completion is awarded to</p>
                                            <h2 style={{ fontSize: '2.8rem', color: '#1E293B', margin: '20px 0', borderBottom: '2px solid #E2E8F0', paddingBottom: '10px', display: 'inline-block' }}>{user?.name}</h2>

                                            <p style={{ color: '#64748B', fontSize: '1.1rem', marginTop: '20px' }}>For successfully passing the academic evaluation of</p>
                                            <h3 style={{ fontSize: '1.8rem', color: '#4F46E5', margin: '15px 0' }}>{course.title}</h3>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginTop: '60px', alignItems: 'flex-end', gap: '20px' }}>
                                                <div style={{ textAlign: 'center' }}>
                                                    <div style={{ fontStyle: 'italic', marginBottom: '5px', color: '#1E293B' }}>Jasmin Peer</div>
                                                    <div style={{ height: '1px', backgroundColor: '#CBD5E1', width: '80%', margin: '0 auto' }}></div>
                                                    <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '5px' }}>Academics Director</div>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px double #4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4F46E5', fontWeight: 800, fontSize: '1.5rem' }}>LQ</div>
                                                </div>
                                                <div style={{ textAlign: 'center' }}>
                                                    <div style={{ fontStyle: 'italic', marginBottom: '5px', color: '#1E293B' }}>{new Date().toLocaleDateString()}</div>
                                                    <div style={{ height: '1px', backgroundColor: '#CBD5E1', width: '80%', margin: '0 auto' }}></div>
                                                    <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '5px' }}>Date Issued</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
                                        <button onClick={handleDownload} className="btn" style={{ background: '#F1F5F9', color: '#1E293B', border: '1px solid #E2E8F0', gap: '10px' }}>
                                            <Download size={20} /> Download PDF
                                        </button>
                                        <button onClick={() => navigate('/dashboard/student')} className="btn btn-primary">Back to Dashboard</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div style={{ padding: '80px 40px' }}>
                                <div style={{ fontSize: '5rem', marginBottom: '30px' }}>😔</div>
                                <h2 style={{ fontSize: '2.5rem', color: '#EF4444' }}>Not Quite There</h2>
                                <p style={{ fontSize: '1.2rem', color: '#64748B', margin: '20px 0 40px' }}>
                                    You scored <strong>{percentage}%</strong>. You need <strong>{course.assessment.passingScore}%</strong> to earn your certificate.
                                </p>
                                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                                    <button onClick={() => navigate(`/learn/${courseId}`)} className="btn" style={{ gap: '10px' }}>
                                        <ArrowLeft size={20} /> Back to Learning
                                    </button>
                                    <button onClick={() => window.location.reload()} className="btn btn-primary" style={{ gap: '10px' }}>
                                        <RefreshCw size={20} /> Try Again Now
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Assessment;
