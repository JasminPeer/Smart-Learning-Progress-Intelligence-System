import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../data/curriculum';
import AuthContext from '../auth/AuthContext';
import api from '../utils/api';
import { Check, X, Award, Download, ArrowLeft, ArrowRight, RefreshCw, Star, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Assessment = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                // 1. Try static first
                const staticCourse = courses.find(c => c.id === courseId);
                let currentCourse = staticCourse;

                if (!currentCourse) {
                    const { data } = await api.get(`/courses/${courseId}`);
                    currentCourse = { ...data, id: data._id };
                }

                if (!currentCourse || !currentCourse.assessment) {
                    navigate('/courses');
                    return;
                }

                setCourse(currentCourse);

                // Initialize userAnswers with nulls
                if (userAnswers.length === 0) {
                    setUserAnswers(new Array(currentCourse.assessment.questions.length).fill(null));
                }
            } catch (err) {
                console.error("Failed to load assessment data", err);
                navigate('/courses');
            } finally {
                setLoading(false);
            }
        };
        fetchCourseData();
    }, [courseId, navigate, userAnswers.length]);

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="loader"></div>
        </div>
    );

    const handleAnswerOptionClick = (option) => {
        const newUserAnswers = [...userAnswers];
        newUserAnswers[currentQuestion] = option;
        setUserAnswers(newUserAnswers);
    };

    const handleNextQuestion = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < course.assessment.questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
            saveAssessmentResult();
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const calculateScore = () => {
        let sc = 0;
        course.assessment.questions.forEach((q, index) => {
            if (userAnswers[index] === q.answer) sc++;
        });
        return sc;
    };

    const score = calculateScore();
    const percentage = Math.round((score / course.assessment.questions.length) * 100);
    const isPassed = percentage >= course.assessment.passingScore;

    const saveAssessmentResult = async () => {
        try {
            if (isPassed) {
                try {
                    console.log("Assessment Passed! Requesting certificate archiving...");
                    await api.post('/profile/certificate',
                        { courseId, courseName: course.title, score: percentage }
                    );
                } catch (certError) {
                    console.error("Failed to archive certificate:", certError);
                }
            }

        } catch (error) {
            console.error("Failed to save result", error);
        }
    };

    const handleDownload = () => {
        alert("Downloading your professional certificate...");
        // Implement real PDF generation here
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F8FAFC', padding: '40px 20px' }}>
            <AnimatePresence mode='wait'>
                {!showScore ? (
                    <motion.div
                        key="assessment-questions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="card"
                        style={{ maxWidth: '750px', width: '100%', padding: '50px', position: 'relative', overflow: 'hidden' }}
                    >
                        {/* Progress Bar */}
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
                                        borderRadius: '8px',
                                        padding: '8px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#64748B'
                                    }}
                                    title="Exit Assessment"
                                >
                                    <ArrowLeft size={18} />
                                </button>
                                <div>
                                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-dark)', margin: 0 }}>
                                        {course.assessment.title}
                                    </h2>
                                    <p style={{ color: '#64748B', fontSize: '0.75rem', margin: 0 }}>Quest for Excellence</p>
                                </div>
                            </div>
                            <div style={{ backgroundColor: '#EEF2FF', padding: '10px 15px', borderRadius: '10px', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem', border: '1px solid #E0E7FF' }}>
                                Question {currentQuestion + 1}/{course.assessment.questions.length}
                            </div>
                        </div>

                        <div style={{ marginBottom: '40px', textAlign: 'left' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '30px', lineHeight: 1.5, color: '#1E293B' }}>{course.assessment.questions[currentQuestion].question}</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {course.assessment.questions[currentQuestion].options.map((option, index) => {
                                    const optionLetter = String.fromCharCode(65 + index);
                                    const isSelected = userAnswers[currentQuestion] === option;

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswerOptionClick(option)}
                                            style={{
                                                padding: '16px 20px',
                                                borderRadius: '12px',
                                                border: `2px solid ${isSelected ? 'var(--primary)' : '#E2E8F0'}`,
                                                backgroundColor: isSelected ? '#EEF2FF' : 'white',
                                                textAlign: 'left',
                                                cursor: 'pointer',
                                                fontSize: '1rem',
                                                transition: 'all 0.2s',
                                                fontWeight: isSelected ? 700 : 500,
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                boxShadow: isSelected ? '0 4px 6px -1px rgba(79, 70, 229, 0.1)' : 'none'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <span style={{
                                                    width: '32px', height: '32px', borderRadius: '8px',
                                                    backgroundColor: isSelected ? 'var(--primary)' : '#F1F5F9',
                                                    color: isSelected ? 'white' : '#64748B',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontWeight: 700, fontSize: '0.9rem'
                                                }}>
                                                    {optionLetter}
                                                </span>
                                                {option}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Dual Side Navigation Controls */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #F1F5F9', gap: '20px' }}>
                            <button
                                onClick={handlePreviousQuestion}
                                disabled={currentQuestion === 0}
                                style={{
                                    flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0',
                                    backgroundColor: currentQuestion === 0 ? '#F8FAFC' : 'white',
                                    color: currentQuestion === 0 ? '#CBD5E1' : '#64748B',
                                    cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                    fontWeight: 600, transition: 'all 0.2s'
                                }}
                            >
                                <ArrowLeft size={18} /> Previous
                            </button>

                            <button
                                onClick={handleNextQuestion}
                                style={{
                                    flex: 2, padding: '14px', borderRadius: '12px', border: 'none',
                                    backgroundColor: 'var(--primary)',
                                    color: 'white',
                                    cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                    fontWeight: 700, transition: 'all 0.2s',
                                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
                                }}
                            >
                                {currentQuestion === course.assessment.questions.length - 1 ? 'Finish Assessment' : 'Next Question'}
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="assessment-score"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="card"
                        style={{ maxWidth: '850px', width: '100%', padding: '0', textAlign: 'center', overflow: 'hidden', marginBottom: '40px' }}
                    >
                        {isPassed ? (
                            <div>
                                <div style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)', padding: '60px 40px', color: 'white' }}>
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ type: 'spring', damping: 10 }}>
                                        <Award size={100} style={{ margin: '0 auto 20px', color: '#FACC15' }} />
                                    </motion.div>
                                    <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'white' }}>Congratulations!</h2>
                                    <p style={{ opacity: 0.9, fontSize: '1.2rem' }}>You have successfully completed the assessment for <strong>{course.title}</strong></p>
                                    <div style={{ marginTop: '20px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '50px', display: 'inline-block' }}>
                                        Score: {score}/{course.assessment.questions.length} ({percentage}%)
                                    </div>
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
                                    You scored <strong>{score}</strong> out of <strong>{course.assessment.questions.length}</strong> ({percentage}%).
                                    <br />You need <strong>{course.assessment.passingScore}%</strong> to earn your certificate.
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

                        {/* Detailed Question Review Section */}
                        <div style={{ padding: '40px', borderTop: '2px solid #F1F5F9', backgroundColor: 'white', textAlign: 'left' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '30px', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Star size={24} color="#FACC15" fill="#FACC15" /> Performance Review
                            </h3>
                            <div style={{ display: 'grid', gap: '25px' }}>
                                {course.assessment.questions.map((q, idx) => {
                                    const userAnswer = userAnswers[idx];
                                    const isCorrect = userAnswer === q.answer;

                                    return (
                                        <div key={idx} style={{ padding: '25px', borderRadius: '16px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', marginBottom: '15px' }}>
                                                <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#1E293B', fontWeight: 600, lineHeight: 1.4 }}>
                                                    {idx + 1}. {q.question}
                                                </h4>
                                                {userAnswer ? (
                                                    <div style={{
                                                        backgroundColor: isCorrect ? '#DCFCE7' : '#FEE2E2',
                                                        color: isCorrect ? '#10B981' : '#EF4444',
                                                        padding: '4px 12px',
                                                        borderRadius: '20px',
                                                        fontSize: '0.8rem',
                                                        fontWeight: 700,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '5px'
                                                    }}>
                                                        {isCorrect ? <Check size={14} /> : <X size={14} />}
                                                        {isCorrect ? 'Correct' : 'Incorrect'}
                                                    </div>
                                                ) : (
                                                    <div style={{ backgroundColor: '#F1F5F9', color: '#64748B', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
                                                        Skipped
                                                    </div>
                                                )}
                                            </div>

                                            <div style={{ display: 'grid', gap: '10px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <span style={{ color: '#64748B', fontSize: '0.9rem', width: '100px', flexShrink: 0 }}>Your Answer:</span>
                                                    <span style={{ color: userAnswer === q.answer ? '#10B981' : '#EF4444', fontWeight: 600 }}>{userAnswer || 'No answer selected'}</span>
                                                </div>
                                                {!isCorrect && (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <span style={{ color: '#64748B', fontSize: '0.9rem', width: '100px', flexShrink: 0 }}>Correct Answer:</span>
                                                        <span style={{ color: '#10B981', fontWeight: 600 }}>{q.answer}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Assessment;
