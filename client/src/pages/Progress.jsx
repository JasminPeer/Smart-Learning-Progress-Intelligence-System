import { useState, useEffect, useContext } from 'react';
import AuthContext from '../auth/AuthContext';
import axios from 'axios';
import { TrendingUp, BookOpen, CheckCircle, Clock, Target, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Progress = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.get('/api/profile/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfile(data);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const performanceData = [
        { name: 'Mon', hours: 2, score: 70 },
        { name: 'Tue', hours: 4, score: 75 },
        { name: 'Wed', hours: 3, score: 72 },
        { name: 'Thu', hours: 5, score: 85 },
        { name: 'Fri', hours: 3, score: 80 },
        { name: 'Sat', hours: 6, score: 90 },
        { name: 'Sun', hours: 4, score: 92 },
    ];

    if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading progress data...</div>;

    const completedCourses = profile?.enrolledCourses?.filter(c => c.completed).length || 0;
    const ongoingCourses = profile?.enrolledCourses?.filter(c => !c.completed).length || 0;

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '10px' }}>Learning Analytics</h1>
                <p style={{ color: '#64748B', fontSize: '1.1rem' }}>Deep dive into your performance and course progress.</p>
            </div>

            {/* Summary Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '40px' }}>
                <div className="card" style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: '20px', background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)', color: 'white' }}>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '12px' }}>
                        <Target size={24} color="white" />
                    </div>
                    <div>
                        <div style={{ opacity: 0.8, fontSize: '0.85rem' }}>Average Score</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>84%</div>
                    </div>
                </div>

                <div className="card" style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ backgroundColor: '#F0FDF4', padding: '12px', borderRadius: '12px' }}>
                        <CheckCircle size={24} color="#10B981" />
                    </div>
                    <div>
                        <div style={{ color: '#64748B', fontSize: '0.85rem' }}>Courses Completed</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{completedCourses}</div>
                    </div>
                </div>

                <div className="card" style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ backgroundColor: '#EEF2FF', padding: '12px', borderRadius: '12px' }}>
                        <BookOpen size={24} color="#4F46E5" />
                    </div>
                    <div>
                        <div style={{ color: '#64748B', fontSize: '0.85rem' }}>Ongoing Courses</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{ongoingCourses}</div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
                <div className="card" style={{ padding: '30px', minHeight: '400px' }}>
                    <h3 style={{ marginBottom: '25px' }}>Weekly Study Hours</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={performanceData}>
                            <defs>
                                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="hours" stroke="#4F46E5" fillOpacity={1} fill="url(#colorHours)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="card" style={{ padding: '30px' }}>
                    <h3 style={{ marginBottom: '25px' }}>Detailed Subject Analysis</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {profile?.subjects?.map((sub, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
                                    <span>{sub.name}</span>
                                    <span>{Math.round((sub.currentMarks / (sub.totalMarks || 100)) * 100)}%</span>
                                </div>
                                <div style={{ height: '10px', backgroundColor: '#E2E8F0', borderRadius: '5px', overflow: 'hidden' }}>
                                    <div style={{
                                        width: `${(sub.currentMarks / (sub.totalMarks || 100)) * 100}%`,
                                        height: '100%',
                                        backgroundColor: (sub.currentMarks / (sub.totalMarks || 100)) < 0.5 ? '#EF4444' : '#10B981',
                                        transition: 'width 0.5s ease'
                                    }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Course Progress List */}
            <div className="card" style={{ padding: '30px' }}>
                <h3 style={{ marginBottom: '30px' }}>Individual Course Performance</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
                    {profile?.enrolledCourses?.map((ec, idx) => (
                        <div key={idx} style={{ padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', position: 'relative' }}>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '15px' }}>{ec.name}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                <div style={{ flexGrow: 1, height: '6px', backgroundColor: '#F1F5F9', borderRadius: '3px' }}>
                                    <div style={{ width: `${ec.progress}%`, height: '100%', backgroundColor: 'var(--primary)', borderRadius: '3px' }}></div>
                                </div>
                                <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{ec.progress}%</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                                <span style={{ fontSize: '0.75rem', color: ec.completed ? '#10B981' : '#64748B', fontWeight: 700 }}>
                                    {ec.completed ? 'COURSE CERTIFIED' : 'ACTIVE LEARNING'}
                                </span>
                                <ArrowUpRight size={16} color="#94A3B8" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Progress;
