import { useState, useMemo, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Clock, User, BookOpen, CheckCircle, PlayCircle } from 'lucide-react';
import { courses as curriculumCourses } from '../data/curriculum';
import AuthContext from '../auth/AuthContext';
import api, { API_URL } from '../utils/api';

const Courses = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [dbCourses, setDbCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Enrolled Courses & All Course Catalog
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [profileRes, coursesRes] = await Promise.all([
                    api.get('/profile/me'),
                    api.get('/courses')
                ]);

                setEnrolledCourses(profileRes.data.enrolledCourses || []);
                setDbCourses(coursesRes.data || []);
            } catch (err) {
                console.error("Failed to fetch page data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, []);

    const handleEnroll = async (courseId, courseTitle, e) => {
        e.stopPropagation(); // Prevent card click

        // Find if already enrolled
        const enrolledCourse = enrolledCourses.find(c => c.courseId === courseId);

        if (enrolledCourse) {
            // Already enrolled -> Go to Player
            navigate(`/learn/${courseId}`);
        } else {
            // Enroll logic
            try {
                await api.post('/profile/enroll',
                    { courseId, name: courseTitle }
                );
                // Refresh enrollment status
                setEnrolledCourses(prev => [...prev, { courseId, name: courseTitle, completed: false }]);
                alert("Enrollment successful! Redirecting to course player...");
                navigate(`/learn/${courseId}`);
            } catch (err) {
                alert("Enrollment failed: " + (err.response?.data?.message || err.message));
            }
        }
    };

    // Mapping All Data to UI format
    const displayCourses = useMemo(() => {
        const staticFormatted = curriculumCourses.map(c => ({
            ...c,
            instructor: "Academic Expert",
            rating: 4.8,
            students: 120 + Math.floor(Math.random() * 5000),
            image: c.coverImage || c.image || '/assets/store/education_placeholder.jpg',
            price: "Free",
            isStatic: true
        }));

        const dbFormatted = dbCourses.map(c => ({
            ...c,
            id: c._id, // Normalize ID
            instructor: "Jasmin Peer",
            students: 50 + Math.floor(Math.random() * 1000),
            image: c.image || '/assets/store/education_placeholder.jpg',
            price: "Free",
            isStatic: false
        }));

        return [...staticFormatted, ...dbFormatted];
    }, [dbCourses]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredCourses = useMemo(() => {
        return displayCourses.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory, displayCourses]);

    const categories = ['All', 'Class 6-10', 'Class 11-12', 'NEET', 'JEE', 'UG Courses', 'PG Courses'];

    if (loading) return <div>Loading Courses...</div>;

    return (
        <div style={{ paddingBottom: '40px', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>

            {/* Header + Search */}
            <div style={{ marginBottom: '30px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>Explore Courses</h1>
                    <p style={{ color: '#64748B' }}>Unlock your potential with our expert-led courses.</p>
                </div>
                <div style={{ position: 'relative', minWidth: '300px' }}>
                    <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={20} />
                    <input
                        type="text"
                        placeholder="Search for courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '12px 12px 12px 45px', width: '100%', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none' }}
                    />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' }}>

                {/* Filters */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', position: 'sticky', top: '30px', alignSelf: 'start' }}>
                    <div className="card" style={{ padding: '20px' }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '15px', color: '#1E293B' }}>Category</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {categories.map(cat => (
                                <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: selectedCategory === cat ? 'var(--primary)' : '#64748B' }}>
                                    <input type="radio" name="category" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} style={{ accentColor: 'var(--primary)' }} />
                                    {cat}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Course Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                    {filteredCourses.map(course => {
                        const enrolledCourse = enrolledCourses.find(c => c.courseId === course.id);
                        const isEnrolled = !!enrolledCourse;
                        const isCompleted = enrolledCourse?.completed;

                        return (
                            <div key={course.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: isCompleted ? '2px solid #10B981' : 'none' }}>
                                {/* Image Area */}
                                <div style={{ height: '180px', backgroundColor: '#1E1B4B', overflow: 'hidden', position: 'relative' }}>
                                    <img
                                        src={
                                            course.coverImage ||
                                            (course.image?.startsWith('/uploads') ? `${API_URL}${course.image}` : course.image) ||
                                            `/assets/store/${course.category?.toLowerCase().replace(/\s+/g, '_')}_placeholder.jpg`
                                        }
                                        alt={course.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)' }}></div>
                                    {isEnrolled && (
                                        <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: isCompleted ? '#10B981' : '#4F46E5', color: 'white', padding: '5px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', zIndex: 5 }}>
                                            {isCompleted ? <><CheckCircle size={14} /> Completed</> : <><PlayCircle size={14} /> In Progress</>}
                                        </div>
                                    )}
                                </div>

                                <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
                                        {course.category}
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{course.title}</h3>
                                    <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.5 }}>
                                        {course.description}
                                    </p>

                                    <div style={{ marginTop: 'auto' }}>
                                        <button
                                            onClick={(e) => handleEnroll(course.id, course.title, e)}
                                            className="btn"
                                            style={{
                                                width: '100%',
                                                backgroundColor: isCompleted ? '#DCFCE7' : (isEnrolled ? '#EEF2FF' : 'var(--primary)'),
                                                color: isCompleted ? '#166534' : (isEnrolled ? '#4F46E5' : 'white'),
                                                border: isEnrolled ? `1px solid ${isCompleted ? '#166534' : '#4F46E5'}` : 'none',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                                fontWeight: 700
                                            }}
                                        >
                                            {isCompleted ? "Review Course" : (isEnrolled ? "Continue Learning" : "Enroll Now")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Courses;
