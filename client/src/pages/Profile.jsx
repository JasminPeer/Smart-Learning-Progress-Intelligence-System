import { useState, useContext, useEffect } from 'react';
import {
    User, Mail, Calendar, MapPin, Edit3,
    Award, BookOpen, Clock, TrendingUp,
    CheckCircle2, Lock, Share2, Save, X
} from 'lucide-react';
import {
    ResponsiveContainer, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip
} from 'recharts';
import AuthContext from '../auth/AuthContext';
import { getStoredProfile, saveStoredProfile } from '../utils/storage';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditing, setIsEditing] = useState(false);

    // Local State for Profile Data (persisted)
    const [profileData, setProfileData] = useState({
        location: 'New York, USA',
        bio: 'Student • Computer Science Major',
        ...user
    });

    // Load from local storage on mount
    useEffect(() => {
        if (user) {
            const stored = getStoredProfile({
                location: 'New York, USA',
                bio: 'Student • Computer Science Major',
                ...user
            });
            // Merge auth user with stored extra details
            setProfileData(prev => ({ ...prev, ...stored, email: user.email }));
        }
    }, [user]);

    const handleSave = () => {
        saveStoredProfile(profileData);
        setIsEditing(false);
    };

    // Mock Data
    const stats = [
        { label: 'Courses Completed', value: '12', icon: <BookOpen size={20} />, color: 'var(--primary)' },
        { label: 'Study Hours', value: '145h', icon: <Clock size={20} />, color: '#F59E0B' },
        { label: 'Average Grade', value: '92%', icon: <TrendingUp size={20} />, color: '#10B981' },
        { label: 'Achievements', value: '8', icon: <Award size={20} />, color: '#8B5CF6' },
    ];

    const skillsData = [
        { subject: 'Math', A: 120, fullMark: 150 },
        { subject: 'Science', A: 98, fullMark: 150 },
        { subject: 'English', A: 86, fullMark: 150 },
        { subject: 'History', A: 99, fullMark: 150 },
        { subject: 'Physics', A: 85, fullMark: 150 },
        { subject: 'Arts', A: 65, fullMark: 150 },
    ];

    const achievements = [
        { id: 1, title: 'Early Bird', desc: 'Completed a quiz before 8 AM', icon: '🌅', unlocked: true },
        { id: 2, title: 'Math Whiz', desc: 'Scored 100% in Calculus', icon: '➗', unlocked: true },
        { id: 3, title: 'Bookworm', desc: 'Read 50 hours of content', icon: '📚', unlocked: true },
        { id: 4, title: 'Consistency King', desc: '7-day login streak', icon: '🔥', unlocked: true },
        { id: 5, title: 'Helping Hand', desc: 'Answered 10 forum questions', icon: '🤝', unlocked: false },
        { id: 6, title: 'Speedster', desc: 'Finished a quiz in < 5 mins', icon: '⚡', unlocked: false },
    ];

    const timeline = [
        { id: 1, type: 'course', title: 'Started "Advanced Calculus II"', time: '2 hours ago', icon: <BookOpen size={16} /> },
        { id: 2, type: 'quiz', title: 'Scored 95% in Physics Quiz', time: 'Yesterday', icon: <CheckCircle2 size={16} /> },
        { id: 3, type: 'achievement', title: 'Unlocked "Consistency King"', time: '2 days ago', icon: <Award size={16} /> },
        { id: 4, type: 'system', title: 'Joined LearnIQ Analysis Platform', time: '1 week ago', icon: <User size={16} /> },
    ];

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', paddingBottom: '40px' }}>

            {/* 1. Header Section */}
            <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px', position: 'relative' }}>
                {/* Cover Image */}
                <div style={{
                    height: '200px',
                    width: '100%',
                    background: 'linear-gradient(135deg, var(--primary) 0%, #059669 100%)',
                    position: 'relative'
                }}>
                    <div style={{ position: 'absolute', bottom: '20px', right: '20px', display: 'flex', gap: '10px' }}>
                        {isEditing ? (
                            <>
                                <button onClick={() => setIsEditing(false)} className="btn" style={{ backgroundColor: 'white', color: '#EF4444' }}>
                                    <X size={18} style={{ marginRight: '8px' }} /> Cancel
                                </button>
                                <button onClick={handleSave} className="btn" style={{ backgroundColor: '#10B981', color: 'white' }}>
                                    <Save size={18} style={{ marginRight: '8px' }} /> Save Changes
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="btn" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(5px)', border: 'none' }}>
                                    <Share2 size={18} style={{ marginRight: '8px' }} /> Share Profile
                                </button>
                                <button onClick={() => setIsEditing(true)} className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)' }}>
                                    <Edit3 size={18} style={{ marginRight: '8px' }} /> Edit Profile
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Profile Info */}
                <div style={{ padding: '0 40px 30px', position: 'relative', display: 'flex', alignItems: 'flex-end', marginTop: '-60px', gap: '30px' }}>

                    {/* Avatar */}
                    <div style={{
                        width: '140px', height: '140px',
                        borderRadius: '50%',
                        border: '5px solid white',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '3.5rem', fontWeight: 800, color: 'var(--primary)',
                        position: 'relative', zIndex: 2
                    }}>
                        {profileData.name?.charAt(0).toUpperCase()}
                        <div style={{
                            position: 'absolute', bottom: '10px', right: '10px',
                            width: '24px', height: '24px',
                            backgroundColor: '#10B981',
                            borderRadius: '50%',
                            border: '3px solid white'
                        }}></div>
                    </div>

                    {/* Text Info */}
                    <div style={{ flexGrow: 1, paddingBottom: '10px' }}>
                        {isEditing ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
                                <input
                                    type="text"
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    style={{ fontSize: '1.5rem', padding: '5px', borderRadius: '5px', border: '1px solid #E2E8F0', fontWeight: 800 }}
                                />
                                <input
                                    type="text"
                                    value={profileData.bio}
                                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                    style={{ fontSize: '1rem', padding: '5px', borderRadius: '5px', border: '1px solid #E2E8F0' }}
                                />
                                <input
                                    type="text"
                                    value={profileData.location}
                                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                                    style={{ fontSize: '0.9rem', padding: '5px', borderRadius: '5px', border: '1px solid #E2E8F0' }}
                                />
                            </div>
                        ) : (
                            <>
                                <h1 style={{ fontSize: '2rem', marginBottom: '5px', fontWeight: 800 }}>{profileData.name}</h1>
                                <p style={{ color: '#64748B', fontSize: '1.1rem', marginBottom: '15px' }}>{profileData.bio}</p>

                                <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: '#64748B' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <MapPin size={16} /> {profileData.location}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Calendar size={16} /> Joined September 2025
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Mail size={16} /> {profileData.email}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* 2. Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '25px',
                marginBottom: '40px'
            }}>
                {stats.map((stat, i) => (
                    <div key={i} className="card" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{
                            width: '60px', height: '60px',
                            borderRadius: '16px',
                            backgroundColor: `${stat.color}20`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: stat.color
                        }}>
                            {stat.icon}
                        </div>
                        <div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1E293B' }}>{stat.value}</div>
                            <div style={{ color: '#64748B', fontSize: '0.95rem' }}>{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. Main Content: Tabs + Sections */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>

                {/* Left Column */}
                <div>
                    {/* Tabs */}
                    <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', marginBottom: '30px' }}>
                        {['Overview', 'Achievements', 'Journey'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase())}
                                style={{
                                    padding: '12px 24px',
                                    background: 'none',
                                    border: 'none',
                                    borderBottom: activeTab === tab.toLowerCase() ? '3px solid var(--primary)' : '3px solid transparent',
                                    fontWeight: activeTab === tab.toLowerCase() ? 600 : 500,
                                    color: activeTab === tab.toLowerCase() ? 'var(--primary)' : '#64748B',
                                    cursor: 'pointer',
                                    fontSize: '1rem'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="fade-in">
                        {activeTab === 'overview' && (
                            <div className="card" style={{ padding: '30px' }}>
                                <h3 style={{ marginBottom: '20px' }}>Skills Application Radar</h3>
                                <div style={{ height: '350px', width: '100%' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
                                            <PolarGrid stroke="#E2E8F0" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 12 }} />
                                            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                            <Radar name="Student" dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.4} />
                                            <Tooltip />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                                <p style={{ textAlign: 'center', color: '#64748B', fontSize: '0.9rem', marginTop: '10px' }}>
                                    Analysis based on your last 10 quizzes and assignments.
                                </p>
                            </div>
                        )}

                        {activeTab === 'achievements' && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                                {achievements.map(badge => (
                                    <div key={badge.id} className="card" style={{
                                        padding: '25px',
                                        textAlign: 'center',
                                        opacity: badge.unlocked ? 1 : 0.6,
                                        filter: badge.unlocked ? 'none' : 'grayscale(100%)',
                                        position: 'relative',
                                        border: badge.unlocked ? '1px solid var(--primary-light)' : 'none'
                                    }}>
                                        {!badge.unlocked && <div style={{ position: 'absolute', top: '10px', right: '10px', color: '#94A3B8' }}><Lock size={16} /></div>}
                                        <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{badge.icon}</div>
                                        <h4 style={{ marginBottom: '8px', fontSize: '1.1rem' }}>{badge.title}</h4>
                                        <p style={{ fontSize: '0.85rem', color: '#64748B' }}>{badge.desc}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'journey' && (
                            <div className="card" style={{ padding: '30px' }}>
                                <h3 style={{ marginBottom: '25px' }}>Recent Activity</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                                    {timeline.map((item, i) => (
                                        <div key={item.id} style={{
                                            display: 'flex', gap: '20px',
                                            position: 'relative',
                                            paddingBottom: i === timeline.length - 1 ? 0 : '30px'
                                        }}>
                                            {/* Vertical Line */}
                                            {i !== timeline.length - 1 && (
                                                <div style={{
                                                    position: 'absolute', left: '20px', top: '40px', bottom: 0,
                                                    width: '2px', backgroundColor: '#E2E8F0'
                                                }}></div>
                                            )}

                                            {/* Icon */}
                                            <div style={{
                                                width: '42px', height: '42px',
                                                borderRadius: '50%',
                                                backgroundColor: i === 0 ? 'var(--primary)' : 'white',
                                                border: i === 0 ? 'none' : '2px solid #E2E8F0',
                                                color: i === 0 ? 'white' : '#64748B',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                zIndex: 2, flexShrink: 0
                                            }}>
                                                {item.icon}
                                            </div>

                                            {/* Content */}
                                            <div>
                                                <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{item.title}</h4>
                                                <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>{item.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Mini Stats / Goals */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

                    {/* Next Level Progress */}
                    <div className="card" style={{ padding: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Level 5 Scholar</h3>
                            <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 700 }}>2,450 XP</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden', marginBottom: '10px' }}>
                            <div style={{ width: '75%', height: '100%', backgroundColor: 'var(--primary)', borderRadius: '4px' }}></div>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#64748B', textAlign: 'right' }}>550 XP to Level 6</p>
                    </div>

                    {/* Quick Contacts / Friends */}
                    <div className="card" style={{ padding: '30px' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Study Buddies</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {['Alice Johnson', 'Bob Smith', 'Charlie Brown'].map((name, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 700 }}>
                                        {name.charAt(0)}
                                    </div>
                                    <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{name}</span>
                                    <div style={{ marginLeft: 'auto', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: i === 0 ? '#10B981' : '#E2E8F0' }}></div>
                                </div>
                            ))}
                        </div>
                        <button className="btn" style={{ width: '100%', marginTop: '20px', backgroundColor: '#F3F4F6', color: '#1E293B' }}>Find More Friends</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
