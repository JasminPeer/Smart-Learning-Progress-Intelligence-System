import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AuthContext from '../auth/AuthContext';
import StatCard from '../components/ui/StatCard';
import RecommendationCard from '../components/ui/RecommendationCard';
import SubjectCard from '../dashboards/SubjectCard';
import GoalCard from '../dashboards/GoalCard';
import { TrendingUp, BookOpen, Clock, Target, Flame, Plus, X, Award, ArrowRight, Settings, Trash2, Sparkles } from 'lucide-react';
import api from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import LeaderboardCard from './LeaderboardCard';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [showGoalModal, setShowGoalModal] = useState(false);
    // Persistent State for Goals
    const [goals, setGoals] = useState(() => {
        const saved = localStorage.getItem('learniq_goals');
        return saved ? JSON.parse(saved) : [
            { title: "Complete 5 Practice Tests", current: 4, target: 5 },
            { title: "Study 20 Hours This Week", current: 20, target: 20 }
        ];
    });

    const handleUnenroll = async (courseId, e) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to unenroll from this course? Your progress will be lost.")) return;

        try {
            await api.delete(`/profile/unenroll/${courseId}`);
            // Update local state immediately
            setProfile(prev => ({
                ...prev,
                enrolledCourses: prev.enrolledCourses.filter(c => c.courseId !== courseId)
            }));
            alert("Course removed successfully.");
        } catch (err) {
            console.error("Unenrollment failed:", err);
            alert("Failed to unenroll. Please try again.");
        }
    };

    const [newGoalTitle, setNewGoalTitle] = useState('');
    const [newGoalTarget, setNewGoalTarget] = useState(10);

    // Mock Data for Charts (could be dynamic in real implementation)
    const performanceData = [
        { name: 'Jan', score: 65, average: 60 },
        { name: 'Feb', score: 72, average: 62 },
        { name: 'Mar', score: 68, average: 65 },
        { name: 'Apr', score: 75, average: 68 },
        { name: 'May', score: 84, average: 70 },
        { name: 'Jun', score: 90, average: 72 },
    ];

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (localStorage.getItem('token')) {
                    const { data } = await api.get('/profile/me');
                    setProfile(data);
                }
            } catch (err) {
                console.error("Dashboard fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        localStorage.setItem('learniq_goals', JSON.stringify(goals));
    }, [goals]);

    const handleAction = (action) => {
        if (user?.isDemo) {
            window.location.href = '/register';
            return;
        }
        if (action === 'Add Goal') {
            setShowGoalModal(true);
        }
    };

    const addGoal = () => {
        if (!newGoalTitle) return;
        setGoals([...goals, { title: newGoalTitle, current: 0, target: Number(newGoalTarget) }]);
        setNewGoalTitle('');
        setShowGoalModal(false);
    };

    useEffect(() => {
        console.log("[DEBUG] StudentDashboard - Rendered. User:", user?.email, "Role:", user?.role, "Loading:", loading);
    }, [user, loading]);

    if (loading) return <div style={{ padding: '50px', textAlign: 'center', color: 'var(--primary)' }}>Loading Dashboard...</div>;

    // Demo Data Concept - Populate if demo user has no real data
    const isDemoMode = user?.isDemo;
    console.log("[DEBUG] StudentDashboard - isDemoMode:", isDemoMode);

    // Logic: If demo mode is on, we show mock data ONLY IF there are no real enrollments or subjects.
    // However, if the user has actually enrolled in something, we should probably prefer showing real data
    // or a blend. To be safe and helpful, we'll show real data if enrolledCourses length > 0.
    const hasRealData = profile && (profile.subjects?.length > 0 || profile.enrolledCourses?.length > 0);

    const displayProfile = (isDemoMode && !hasRealData) ? {
        subjects: [
            { name: 'Mathematics', currentMarks: 85, totalMarks: 100 },
            { name: 'Physics', currentMarks: 72, totalMarks: 100 },
            { name: 'Chemistry', currentMarks: 91, totalMarks: 100 },
            { name: 'Biology', currentMarks: 64, totalMarks: 100 }
        ],
        enrolledCourses: [
            { courseId: 'demo-1', name: 'Advanced Calculus II', progress: 65 },
            { courseId: 'demo-2', name: 'Quantum Physics Intro', progress: 42 },
            { courseId: 'demo-3', name: 'Organic Chemistry Masterclass', progress: 88 }
        ],
        achievements: [
            { title: 'Fast Learner', date: new Date() },
            { title: 'Quiz Master', date: new Date() }
        ]
    } : profile;

    const overallScore = displayProfile?.subjects?.length > 0
        ? Math.round((displayProfile.subjects.reduce((a, b) => a + (Number(b.currentMarks) || 0), 0) / displayProfile.subjects.reduce((a, b) => a + (Number(b.totalMarks) || 100), 0)) * 100)
        : 0;

    const currentProfile = displayProfile;

    return (
        <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%' }}>

            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ marginBottom: '10px', fontSize: '2rem' }}>Welcome back, {user?.name?.split(' ')[0] || 'Learner'}!</h1>
                    <p style={{ color: '#64748B' }}>Here's your learning progress for today.</p>
                </div>
            </div>

            {/* Demo Mode Concept Banner */}
            {isDemoMode && (
                <div className="card" style={{
                    marginBottom: '40px',
                    background: 'linear-gradient(135deg, #064E3B 0%, #059669 100%)',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '30px 40px',
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h2 style={{ color: 'white', fontSize: '1.75rem', marginBottom: '10px' }}>Experience LearnIQ Concept</h2>
                        <p style={{ color: '#D1FAE5', fontSize: '1.1rem', maxWidth: '600px', margin: 0 }}>
                            You are exploring the **Platform Vision**. This dashboard showcases how real-time analytics, AI recommendations, and progress tracking transform the learning journey.
                        </p>
                        <button onClick={() => navigate('/register')} className="btn btn-primary" style={{ marginTop: '20px', backgroundColor: 'white', color: '#064E3B' }}>
                            Unlock Full Access <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                        </button>
                    </div>
                    <div style={{ position: 'absolute', right: '-20px', top: '-10px', opacity: 0.1 }}>
                        <Sparkles size={240} />
                    </div>
                </div>
            )}

            {/* Stats Row */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '50px',
                marginBottom: '60px',
                width: '100%',
                justifyContent: 'flex-start'
            }}>
                <div style={{ flex: '1 1 250px', minWidth: '240px' }}>
                    <StatCard
                        title="Overall Score"
                        value={`${overallScore}%`}
                        trend={5}
                        trendLabel="vs last week"
                        icon={<TrendingUp size={24} />}
                        variant="gradient-green" // Updated to green
                    />
                </div>

                <div style={{ flex: '1 1 250px', minWidth: '240px' }}>
                    <StatCard
                        title="Courses Enrolled"
                        value={currentProfile?.enrolledCourses?.length || 0}
                        subtitle={`${currentProfile?.enrolledCourses?.filter(c => !c.completed).length || 0} in progress`}
                        icon={<BookOpen size={24} />}
                        variant="default"
                    />
                </div>

                <div style={{ flex: '1 1 250px', minWidth: '240px' }}>
                    <StatCard
                        title="Study Hours"
                        value="24h"
                        subtitle="This week"
                        trend={12}
                        trendLabel="vs last week"
                        icon={<Clock size={24} />}
                        variant="default"
                    />
                </div>

                <div style={{ flex: '1 1 250px', minWidth: '240px' }}>
                    <StatCard
                        title="Goals Completed"
                        value={`${goals.filter(g => g.current >= g.target).length}/${goals.length}`}
                        subtitle={goals.length > 0 ? `${Math.round((goals.filter(g => g.current >= g.target).length / goals.length) * 100)}% completion` : "0% completion"}
                        icon={<Target size={24} />}
                        variant="solid-green"
                    />
                </div>
            </div>

            {/* Middle Section: Chart | Streak */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '40px',
                marginBottom: '60px',
                marginTop: '20px'
            }}>
                {/* Performance Trend Chart */}
                <div className="card" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
                    <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ marginBottom: '5px' }}>Performance Trend</h3>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748B' }}>Your scores compared to class average</p>
                        </div>
                    </div>
                    <div style={{ flexGrow: 1 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} domain={[0, 100]} />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />
                                <Area type="monotone" dataKey="score" stroke="#10B981" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
                                <Area type="monotone" dataKey="average" stroke="#E5E7EB" strokeWidth={3} strokeDasharray="5 5" fill="none" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right Column: Streak & Leaderboard (Conceptual for Demo) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '20px' }}>
                    <div className="card" style={{
                        background: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
                        color: 'white', border: 'none',
                        position: 'relative', overflow: 'hidden',
                        padding: '30px',
                        boxShadow: '0 10px 15px -3px rgba(249, 115, 22, 0.3)'
                    }}>
                        <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.15 }}>
                            <Flame size={140} color="white" />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Current Streak</span>
                            <div style={{ background: 'rgba(255,255,255,0.25)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                                🔥 On Fire!
                            </div>
                        </div>
                        <div style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, marginBottom: '5px' }}>12 <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>days</span></div>
                        <p style={{ opacity: 0.9, fontSize: '1rem' }}>Personal Best: 21 days</p>
                    </div>

                    {isDemoMode ? (
                        <LeaderboardCard />
                    ) : (
                        <div className="card" style={{ border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Learning Goals</h3>
                                <button onClick={() => handleAction('Add Goal')} className="btn" style={{ padding: '8px 16px', fontSize: '0.85rem', backgroundColor: '#F3F4F6', color: '#1E293B' }}>+ Add Goal</button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                                {goals.map((g, i) => (
                                    <GoalCard key={i} title={g.title} current={g.current} target={g.target} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Section: Subjects, Leaderboard, & Progress */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '60px'
            }}>
                <div>
                    <h3 style={{ marginBottom: '20px' }}>Subject Performance</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
                        {currentProfile?.subjects?.length > 0 ? currentProfile.subjects.map((sub, idx) => {
                            let risk = 'low';
                            const perc = Math.round((sub.currentMarks / (sub.totalMarks || 100)) * 100);
                            if (perc < 50) risk = 'high';
                            else if (perc < 75) risk = 'medium';

                            return (
                                <SubjectCard
                                    key={idx}
                                    subject={sub.name}
                                    startingScore={Math.max(40, perc - 15)} // Simulate starting point for demo
                                    currentProgress={perc}
                                    risk={risk}
                                />
                            );
                        }) : (
                            <p style={{ color: 'gray' }}>No subjects found. Please complete onboarding.</p>
                        )}
                    </div>

                    {/* Move Goals here for Demo Mode so they aren't hidden by Leaderboard */}
                    {isDemoMode && (
                        <div style={{ marginTop: '50px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ margin: 0 }}>Learning Goals</h3>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                                {goals.map((g, i) => (
                                    <GoalCard key={i} title={g.title} current={g.current} target={g.target} />
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{ marginTop: '50px' }}>
                        <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><Award color="var(--primary)" /> Your Achievements</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                            {currentProfile?.achievements?.length > 0 ? currentProfile.achievements.map((ach, idx) => (
                                <div key={idx} className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid #E2E8F0' }}>
                                    <div style={{ backgroundColor: '#F0FDF4', padding: '12px', borderRadius: '12px' }}>
                                        <Award size={24} color="#10B981" />
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{ach.title}</h4>
                                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'gray' }}>Awarded on {new Date(ach.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            )) : (
                                <div className="card" style={{ padding: '40px', textAlign: 'center', color: '#64748B', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                    <Award size={40} opacity={0.3} />
                                    <p style={{ margin: 0 }}>No certificates earned yet. Finish a course to get certified!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <h3 style={{ marginBottom: '20px' }}>Course Progress</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '40px' }}>
                        {currentProfile?.enrolledCourses?.filter(c => !c.completed).length > 0 ? currentProfile.enrolledCourses.filter(c => !c.completed).map((ec, idx) => (
                            <div key={idx} className="card" style={{ padding: '25px', cursor: 'pointer', position: 'relative' }} onClick={() => navigate(`/learn/${ec.courseId}`)}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <h4 style={{ margin: 0 }}>{ec.name}</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <button
                                            onClick={(e) => handleUnenroll(ec.courseId, e)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', display: 'flex', alignItems: 'center', opacity: 0.6 }}
                                            onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                                            onMouseOut={(e) => e.currentTarget.style.opacity = 0.6}
                                            title="Unenroll from course"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>CONTINUE</span>
                                    </div>
                                </div>
                                <div style={{ height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden', marginBottom: '10px' }}>
                                    <div style={{ width: `${ec.progress}%`, height: '100%', backgroundColor: 'var(--primary)', transition: 'width 0.5s' }}></div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748B' }}>
                                    <span>{ec.progress}% Completion</span>
                                    <ArrowRight size={14} />
                                </div>
                            </div>
                        )) : (
                            <p style={{ color: 'gray' }}>No courses enrolled yet. <a href="/courses" style={{ color: 'var(--primary)', fontWeight: 600 }}>Browse Courses</a></p>
                        )}
                    </div>

                    {/* Completed Courses / Expert In section */}
                    <h3 style={{ marginBottom: '20px' }}>Mastery & Expertise</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                        {currentProfile?.enrolledCourses?.filter(c => c.completed).length > 0 ? currentProfile.enrolledCourses.filter(c => c.completed).map((ec, idx) => (
                            <div key={idx} className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid #10B981', backgroundColor: '#F0FDF4' }}>
                                <Award color="#10B981" size={24} />
                                <div>
                                    <h4 style={{ margin: 0 }}>Expert in {ec.name}</h4>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#059669' }}>100% Course Completion</p>
                                </div>
                            </div>
                        )) : (
                            <div className="card" style={{ padding: '30px', textAlign: 'center', borderStyle: 'dashed', color: '#94A3B8' }}>
                                <p>Finish a course to earn your Expert badge!</p>
                            </div>
                        )}
                    </div>

                    <h3 style={{ marginBottom: '20px' }}>Personal Learning Path</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginBottom: '40px' }}>
                        {currentProfile?.subjects?.some(s => (s.currentMarks / (s.totalMarks || 100)) < 0.5) && (
                            <RecommendationCard
                                title="Academic Alert!"
                                description="Your grades in some subjects are below 50%. Focus on revision videos."
                                priority="high"
                                action="Review Weak Topics"
                            />
                        )}
                        <RecommendationCard
                            title="JEE Physics Revision"
                            description="You have 3 chapters pending in Laws of Motion. Start your revision now!"
                            priority="high"
                            action="Resume JEE Course"
                        />
                        <RecommendationCard
                            title="Mock Test Series"
                            description="A new NEET biology mock test is available. Check your preparation level."
                            priority="medium"
                            action="Start Test"
                        />
                    </div>

                </div>
            </div>

            {/* Add Goal Modal */}

            {/* Add Goal Modal */}
            {showGoalModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="card" style={{ width: '400px', padding: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h3 style={{ margin: 0 }}>Add New Goal</h3>
                            <button onClick={() => setShowGoalModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                        </div>
                        <input
                            type="text"
                            placeholder="Goal Title (e.g., Read 5 Chapters)"
                            value={newGoalTitle}
                            onChange={(e) => setNewGoalTitle(e.target.value)}
                            style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                        />
                        <input
                            type="number"
                            placeholder="Target Number"
                            value={newGoalTarget}
                            onChange={(e) => setNewGoalTarget(e.target.value)}
                            style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                        />
                        <button onClick={addGoal} className="btn" style={{ width: '100%' }}>Add Goal</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
