import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../data/curriculum';
import { PlayCircle, CheckCircle, ArrowRight, ArrowLeft, Book, Info, Clock, FileText, Download, BookOpen, Youtube } from 'lucide-react';
import axios from 'axios';

const CoursePlayer = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const course = courses.find(c => c.id === courseId);
    const [activeSubtopicId, setActiveSubtopicId] = useState(null);
    const [progress, setProgress] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [loading, setLoading] = useState(true);

    // Flatten topics into a simple list of subtopics for easier indexing if needed
    const allSubtopics = course.topics?.flatMap(t => t.subtopics.map(s => ({ ...s, topicTitle: t.title }))) || [];
    const activeIndex = allSubtopics.findIndex(s => s.id === activeSubtopicId) === -1 ? 0 : allSubtopics.findIndex(s => s.id === activeSubtopicId);
    const activeSubtopic = allSubtopics[activeIndex] || allSubtopics[0];

    useEffect(() => {
        if (allSubtopics.length > 0 && !activeSubtopicId) {
            setActiveSubtopicId(allSubtopics[0].id);
        }
    }, [allSubtopics, activeSubtopicId]);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.get('/api/profile/me', { headers: { Authorization: `Bearer ${token}` } });
                const enrolledCourse = data.enrolledCourses.find(c => c.courseId === courseId);
                if (enrolledCourse) {
                    setProgress(enrolledCourse.progress);
                    setIsCompleted(enrolledCourse.completed);
                }
            } catch (err) {
                console.error("Progress fetch error", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProgress();
    }, [courseId]);

    if (!course) return <div style={{ padding: '40px', textAlign: 'center' }}>Course not found</div>;
    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading classroom...</div>;

    const handleLectureComplete = async () => {
        const nextIndex = Math.min(activeIndex + 1, allSubtopics.length - 1);
        setActiveSubtopicId(allSubtopics[nextIndex].id);

        // Calculate new progress based on total subtopics
        const calculatedProgress = Math.round(((activeIndex + 1) / allSubtopics.length) * 100);
        const finalProgress = Math.max(progress, calculatedProgress);

        try {
            const token = localStorage.getItem('token');
            const isFinished = finalProgress === 100;

            await axios.put('/api/profile/progress',
                { courseId, progress: finalProgress, completed: isFinished },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setProgress(finalProgress);

            if (isFinished && !isCompleted) {
                setIsCompleted(true);
                // Automatically award certificate/achievement upon completion
                try {
                    await axios.post('/api/profile/certificate',
                        { courseId, courseName: course.title, score: 100 },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    alert("Congratulations! You've mastered this course. A certificate has been added to your achievements!");
                } catch (certErr) {
                    console.error("Auto-certificate failed", certErr);
                }
            }
        } catch (err) {
            console.error("Progress save failed", err);
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
            {/* Sidebar - Nested Playlist */}
            <div style={{ width: '380px', backgroundColor: 'white', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', zIndex: 10 }}>
                <div style={{ padding: '24px', borderBottom: '1px solid #E2E8F0', background: 'linear-gradient(to bottom, #F0FDF4, #FFFFFF)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <button
                            onClick={() => navigate(`/courses/${courseId}`)}
                            style={{
                                backgroundColor: 'transparent', border: 'none', cursor: 'pointer',
                                padding: '5px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'background 0.2s', color: '#64748B'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <ArrowLeft size={18} color="#1E293B" strokeWidth={3} />
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}>Back to Course</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <div style={{ flex: 1 }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{course.title}</h2>
                            <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Course Curriculum</p>
                        </div>
                        {isCompleted && <div style={{ backgroundColor: 'var(--success)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800, whiteSpace: 'nowrap' }}>COMPLETED</div>}
                    </div>
                    <div style={{ height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
                        <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--primary)', transition: 'width 0.5s ease' }}></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                        <span>{progress}% Progress</span>
                        <span>{allSubtopics.length} Lessons</span>
                    </div>
                </div>

                <div style={{ flexGrow: 1, overflowY: 'auto', padding: '0' }}>
                    {course.topics?.map((topic, tIdx) => (
                        <div key={topic.id}>
                            <div style={{
                                padding: '12px 24px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #F1F5F9',
                                borderTop: tIdx !== 0 ? '1px solid #F1F5F9' : 'none',
                                fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px'
                            }}>
                                Topic {tIdx + 1}: {topic.title}
                            </div>
                            {topic.subtopics.map((sub, sIdx) => {
                                const isCurrent = activeSubtopicId === sub.id;
                                const isViewed = allSubtopics.findIndex(s => s.id === sub.id) < activeIndex || isCompleted;

                                return (
                                    <div
                                        key={sub.id}
                                        onClick={() => setActiveSubtopicId(sub.id)}
                                        style={{
                                            padding: '16px 24px',
                                            borderBottom: '1px solid #F1F5F9',
                                            cursor: 'pointer',
                                            backgroundColor: isCurrent ? '#F0FDF4' : 'white',
                                            borderLeft: isCurrent ? '4px solid var(--primary)' : '4px solid transparent',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ color: isCurrent ? 'var(--primary)' : isViewed ? 'var(--success)' : '#94A3B8' }}>
                                                {isViewed ? <CheckCircle size={18} /> : <PlayCircle size={18} />}
                                            </div>
                                            <div style={{
                                                fontSize: '0.9rem',
                                                fontWeight: isCurrent ? 700 : 500,
                                                color: isCurrent ? 'var(--primary-dark)' : 'var(--text-primary)'
                                            }}>
                                                {sub.title}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div style={{ padding: '24px', borderTop: '1px solid #E2E8F0', backgroundColor: '#F9FAFB' }}>
                    <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #E2E8F0' }}>
                        <h4 style={{ fontSize: '0.9rem', marginBottom: '12px', color: '#64748B' }}>Course Assessment</h4>
                        <button
                            onClick={() => navigate(`/assessment/${courseId}`)}
                            className="btn btn-primary"
                            style={{
                                width: '100%',
                                py: '14px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                                border: 'none',
                                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)',
                                fontWeight: 800,
                                fontSize: '1rem'
                            }}
                        >
                            {isCompleted ? "Retake Final Exam" : "Take Final Exam Now"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flexGrow: 1, padding: '40px', overflowY: 'auto' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    {/* Video Area */}
                    <div className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)' }}>
                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, backgroundColor: 'black' }}>
                            <iframe
                                title={activeSubtopic?.title}
                                src={activeSubtopic?.videoUrl}
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div style={{ marginTop: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px', gap: '20px' }}>
                            <div>
                                <div style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                                    {activeSubtopic?.topicTitle}
                                </div>
                                <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--primary-dark)', margin: 0 }}>{activeSubtopic?.title}</h1>
                            </div>
                            <button onClick={handleLectureComplete} className="btn" style={{
                                backgroundColor: 'var(--secondary-light)', color: 'var(--primary)',
                                fontWeight: 700, padding: '12px 28px', display: 'flex', alignItems: 'center', gap: '10px',
                                border: '1px solid var(--primary-light)', borderRadius: '12px'
                            }}>
                                {activeIndex === allSubtopics.length - 1 ? "Finish Course" : "Next Lesson"} <ArrowRight size={18} />
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '35px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
                                {/* Theory Section */}
                                <div className="card" style={{ padding: '35px', borderRadius: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
                                        <div style={{ padding: '10px', backgroundColor: '#EDE9FE', borderRadius: '12px', color: '#8B5CF6' }}>
                                            <Book size={24} />
                                        </div>
                                        <h3 style={{ margin: 0, fontSize: '1.4rem' }}>Key Theory</h3>
                                    </div>
                                    <div style={{ lineHeight: 1.8, fontSize: '1.1rem', color: '#334155', whiteSpace: 'pre-wrap' }}>
                                        {activeSubtopic?.theory}
                                    </div>
                                </div>

                                {/* Detailed Content Section */}
                                <div className="card" style={{ padding: '35px', borderRadius: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
                                        <div style={{ padding: '10px', backgroundColor: '#DCFCE7', borderRadius: '12px', color: '#10B981' }}>
                                            <Info size={24} />
                                        </div>
                                        <h3 style={{ margin: 0, fontSize: '1.4rem' }}>Detailed Explanation</h3>
                                    </div>
                                    <div style={{
                                        lineHeight: 1.9, fontSize: '1.1rem', color: '#475569', whiteSpace: 'pre-wrap',
                                        backgroundColor: '#F9FAFB', padding: '25px', borderRadius: '16px', border: '1px solid #F1F5F9'
                                    }}>
                                        {activeSubtopic?.text}
                                    </div>
                                </div>

                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <div className="card" style={{ padding: '28px', backgroundColor: '#F0FDF4', border: '1px solid #DCFCE7', borderRadius: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                        <CheckCircle size={22} color="#10B981" />
                                        <h4 style={{ margin: 0, color: '#065F46' }}>Learning Objectives</h4>
                                    </div>
                                    <ul style={{ paddingLeft: '20px', fontSize: '0.95rem', color: '#065F46', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <li>Master core principles</li>
                                        <li>Apply to real-world scenarios</li>
                                        <li>Prepare for assessments</li>
                                        <li>Build creative intuition</li>
                                    </ul>
                                </div>

                                <div className="card" style={{ padding: '28px', borderRadius: '20px', textAlign: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '8px', color: '#64748B' }}>
                                        <Clock size={18} />
                                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Study Time</span>
                                    </div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-dark)' }}>45 - 60 Min</div>
                                </div>

                                {/* Resources Section */}
                                <div className="card" style={{ padding: '35px', borderRadius: '20px', border: '1px dashed var(--primary)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
                                        <div style={{ padding: '10px', backgroundColor: '#ECFDF5', borderRadius: '12px', color: '#059669' }}>
                                            <FileText size={24} />
                                        </div>
                                        <h3 style={{ margin: 0, fontSize: '1.4rem' }}>Study Resources</h3>
                                    </div>
                                    <div style={{ padding: '20px', backgroundColor: '#F0FDF4', border: '1px dashed #10B981', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ color: '#FF0000' }}><Youtube size={24} /></div>
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: '1rem' }}>Official Learning Channel</div>
                                                <div style={{ fontSize: '0.85rem', color: '#059669', marginTop: '4px' }}>Physics Wallah - Curated Educational Content</div>
                                            </div>
                                        </div>
                                        <a href="https://www.youtube.com/@PhysicsWallah" target="_blank" rel="noreferrer" className="btn" style={{ fontSize: '0.85rem', padding: '8px 16px', backgroundColor: '#059669', color: 'white', textDecoration: 'none' }}>Visit Channel</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePlayer;
