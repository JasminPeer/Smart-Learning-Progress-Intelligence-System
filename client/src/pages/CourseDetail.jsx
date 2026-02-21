import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, User, BookOpen, CheckCircle, PlayCircle, FileText, MessageCircle, Download, Share2, ArrowRight, ArrowLeft } from 'lucide-react';
import { courses as curriculumCourses } from '../data/curriculum';
import axios from 'axios';

const CourseDetail = () => {
    const { id: courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [enrolled, setEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                // 1. Try static first
                const staticCourse = curriculumCourses.find(c => c.id === courseId);
                if (staticCourse) {
                    setCourse(staticCourse);
                } else {
                    // 2. Fetch from DB
                    const token = localStorage.getItem('token');
                    const { data } = await axios.get(`/api/courses/${courseId}`, { headers: { Authorization: `Bearer ${token}` } });
                    setCourse({ ...data, id: data._id }); // Normalize ID
                }

                // 3. Check enrollment
                const token = localStorage.getItem('token');
                if (token) {
                    const { data: profile } = await axios.get('/api/profile/me', { headers: { Authorization: `Bearer ${token}` } });
                    const isEnrolled = profile.enrolledCourses?.some(c => c.courseId === courseId);
                    setEnrolled(isEnrolled);
                }
            } catch (err) {
                console.error("Failed to load course details", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourseData();
    }, [courseId]);

    if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}><h2>Loading course details...</h2></div>;
    if (!course) return <div style={{ padding: '100px', textAlign: 'center' }}><h2>Course Not Found</h2><button onClick={() => navigate('/courses')} className="btn">Back to Courses</button></div>;

    const handleEnrollClick = async () => {
        if (enrolled) {
            navigate(`/learn/${courseId}`);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            await axios.post('/api/profile/enroll',
                { courseId: course.id, name: course.title },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setEnrolled(true);
            alert(`Successfully enrolled in ${course.title}!`);
            navigate(`/learn/${courseId}`);
        } catch (err) {
            alert("Enrollment failed: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div style={{ paddingBottom: '50px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            {/* Back Button */}
            {/* Back Button */}
            <button onClick={() => navigate('/courses')} style={{ background: 'none', border: 'none', color: '#1E293B', cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 700 }}>
                <ArrowLeft size={20} /> Back to Courses
            </button>

            {/* Hero Section */}
            <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px', position: 'relative', borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                <div style={{ height: '400px', width: '100%', position: 'relative' }}>
                    <img src={course.coverImage || course.image || `/assets/store/education_placeholder.jpg`} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.4) 50%, transparent 100%)' }}></div>

                    <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px', color: 'white' }}>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                            <span style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '6px 14px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>{course.category}</span>
                            <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', padding: '6px 14px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700 }}>{course.duration}</span>
                        </div>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '15px', lineHeight: 1.1 }}>{course.title}</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '25px', fontSize: '1rem', opacity: 0.9 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Star size={20} fill="#FACC15" color="#FACC15" />
                                <span style={{ fontWeight: 800 }}>4.8</span>
                                <span style={{ opacity: 0.8 }}>(1.2k+ reviews)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <User size={20} /> 15,400+ students enrolled
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px' }}>
                {/* Left Column: Content */}
                <div>
                    {/* Tabs */}
                    <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', marginBottom: '35px', gap: '10px' }}>
                        {['Overview', 'Curriculum', 'Reviews', 'Resources'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase())}
                                style={{
                                    padding: '12px 28px',
                                    background: 'none',
                                    border: 'none',
                                    borderBottom: activeTab === tab.toLowerCase() ? '3px solid var(--primary)' : '3px solid transparent',
                                    fontWeight: activeTab === tab.toLowerCase() ? 700 : 600,
                                    color: activeTab === tab.toLowerCase() ? 'var(--primary)' : '#64748B',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div style={{ transition: 'all 0.3s' }}>
                        {activeTab === 'overview' && (
                            <div className="card" style={{ padding: '40px', borderRadius: '24px' }}>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '20px', color: 'var(--primary-dark)' }}>About this course</h2>
                                <p style={{ lineHeight: 1.8, color: '#475569', fontSize: '1.1rem', marginBottom: '30px' }}>{course.description}</p>

                                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px' }}>Learning outcomes</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    {['Master core concepts', 'Practical application', 'Assessment preparation', 'Expert guidance'].map((item, index) => (
                                        <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                            <div style={{ backgroundColor: '#F0FDF4', padding: '4px', borderRadius: '50%' }}>
                                                <CheckCircle size={18} color="#10B981" />
                                            </div>
                                            <span style={{ color: '#475569', fontWeight: 500 }}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'curriculum' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                {course.topics?.map((topic, tIndex) => (
                                    <div key={tIndex} className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
                                        <div style={{ padding: '24px 30px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <div style={{ backgroundColor: 'var(--primary)', color: 'white', width: '32px', height: '32px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 800 }}>
                                                    {tIndex + 1}
                                                </div>
                                                <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{topic.title}</h3>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748B', fontWeight: 600, fontSize: '0.9rem' }}>
                                                <BookOpen size={18} />
                                                <span>{topic.subtopics?.length} Modules</span>
                                            </div>
                                        </div>
                                        <div>
                                            {topic.subtopics?.map((sub, sIndex) => (
                                                <div key={sIndex}
                                                    onClick={() => enrolled && navigate(`/learn/${courseId}`)}
                                                    style={{
                                                        padding: '20px 30px',
                                                        borderBottom: sIndex !== topic.subtopics.length - 1 ? '1px solid #F1F5F9' : 'none',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                        cursor: enrolled ? 'pointer' : 'default', transition: 'background 0.2s',
                                                        backgroundColor: 'white'
                                                    }} className="lesson-item">
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                        <div style={{ color: enrolled ? 'var(--primary)' : '#94A3B8' }}>
                                                            <PlayCircle size={22} />
                                                        </div>
                                                        <span style={{ color: '#334155', fontWeight: 600, fontSize: '1.05rem' }}>{sub.title}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>Video</span>
                                                        <ArrowRight size={18} color="#CBD5E1" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'resources' && (
                            <div className="card" style={{ padding: '40px', borderRadius: '24px' }}>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '25px', color: 'var(--primary-dark)' }}>Additional Resources</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
                                    <div style={{ padding: '30px', backgroundColor: '#F8FAFC', borderRadius: '24px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '25px' }}>
                                        <div style={{ backgroundColor: '#FEE2E2', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <PlayCircle size={36} color="#EF4444" />
                                        </div>
                                        <div style={{ flexGrow: 1 }}>
                                            <h3 style={{ margin: '0 0 5px 0', fontSize: '1.4rem' }}>Official YouTube Channel</h3>
                                            <p style={{ margin: '0 0 15px 0', color: '#64748B' }}>Subscribe to our official channel for topic-wise deep dives and expert sessions.</p>
                                            <a
                                                href="https://www.youtube.com/@jasminpeer006"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn"
                                                style={{ backgroundColor: '#EF4444', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '0.95rem' }}
                                            >
                                                Subscribe to Channel <ArrowRight size={18} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: CTA */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div className="card" style={{ padding: '35px', position: 'sticky', top: '30px', borderRadius: '28px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)' }}>
                        <div style={{ marginBottom: '25px' }}>
                            <div style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 600, marginBottom: '5px' }}>Course Price</div>
                            <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary-dark)' }}>FREE</div>
                        </div>

                        <button
                            onClick={handleEnrollClick}
                            className={`btn ${enrolled ? 'btn-secondary' : 'btn-primary'}`}
                            style={{ width: '100%', padding: '18px', fontSize: '1.2rem', borderRadius: '16px', fontWeight: 800, marginBottom: '20px' }}
                        >
                            {enrolled ? 'Continue Learning' : 'Enroll Now'}
                        </button>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: '#475569', fontSize: '1rem', fontWeight: 500 }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><Clock size={20} color="var(--primary)" /> {course.duration} curriculum</div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><BookOpen size={20} color="var(--primary)" /> Full access to theory</div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><FileText size={20} color="var(--primary)" /> 6-Option MCQs</div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><CheckCircle size={20} color="var(--primary)" /> Official Certificate</div>
                        </div>

                        <div style={{ marginTop: '30px', paddingTop: '25px', borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
                            <p style={{ fontSize: '0.85rem', color: '#64748B', margin: 0 }}>Join over <b>15,000</b> students today!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
