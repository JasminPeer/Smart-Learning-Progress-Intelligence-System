import { useState, useContext, useEffect } from 'react';
import {
    User, Mail, Calendar, MapPin, Edit3,
    Award, BookOpen, Clock, TrendingUp,
    CheckCircle2, Lock, Share2, Save, X, Camera
} from 'lucide-react';
import {
    ResponsiveContainer, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import AuthContext from '../auth/AuthContext';

const Profile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditing, setIsEditing] = useState(false);
    const [notification, setNotification] = useState(null);

    // Profile state initialized from user context
    const [profileData, setProfileData] = useState({
        name: '',
        bio: 'Student',
        location: 'Not set',
        email: ''
    });

    const [fontSize, setFontSize] = useState(user?.fontSize || 'medium');
    const [theme, setTheme] = useState(user?.theme || 'light');
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || '',
                bio: user.bio || 'Student',
                location: user.location || 'Not set',
                email: user.email || ''
            });
            setTheme(user.theme || 'light');
            setFontSize(user.fontSize || 'medium');
        }
    }, [user]);

    const handleSave = async () => {
        try {
            await updateUser({
                name: profileData.name,
                bio: profileData.bio,
                location: profileData.location,
                theme: theme,
                fontSize: fontSize
            });
            setIsEditing(false);
            setNotification({ type: 'success', message: 'Profile updated successfully!' });
            setTimeout(() => setNotification(null), 3000);
        } catch (err) {
            setNotification({ type: 'error', message: 'Failed to update profile.' });
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) { // 1MB limit for Base64 storage
                setNotification({ type: 'error', message: 'Image size must be less than 1MB' });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = reader.result;
                try {
                    await updateUser({ avatar: base64String });
                    setNotification({ type: 'success', message: 'Profile picture updated!' });
                } catch (err) {
                    setNotification({ type: 'error', message: 'Failed to upload image' });
                }
            };
            reader.readAsDataURL(file);
        }
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
            {/* Notification Banner */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            padding: '15px 25px',
                            backgroundColor: notification.type === 'success' ? '#10B981' : '#EF4444',
                            color: 'white',
                            borderRadius: '12px',
                            marginBottom: '20px',
                            textAlign: 'center',
                            fontWeight: 600,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                    >
                        {notification.message}
                    </motion.div>
                )}
            </AnimatePresence>

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
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            width: '140px', height: '140px',
                            borderRadius: '25px',
                            border: '5px solid var(--bg-card)',
                            backgroundColor: 'white',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            overflow: 'hidden',
                            position: 'relative', zIndex: 2
                        }}>
                            {user?.avatar ? (
                                <img src={user.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--primary)' }}>
                                    {profileData.name?.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => fileInputRef.current.click()}
                            style={{
                                position: 'absolute',
                                bottom: '5px',
                                right: '5px',
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                backgroundColor: 'var(--primary)',
                                color: 'white',
                                border: '3px solid var(--bg-card)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 3
                            }}
                        >
                            <Camera size={16} />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
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
                                <h1 style={{ fontSize: '2rem', marginBottom: '5px', fontWeight: 800, color: 'var(--text-primary)' }}>{profileData.name}</h1>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '15px' }}>{profileData.bio}</p>

                                <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
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

                {/* Tab Navigation */}
                <div style={{ display: 'flex', gap: '40px', padding: '0 40px', borderTop: '1px solid var(--border)' }}>
                    {['overview', 'achievements', 'settings'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '15px 5px',
                                background: 'none',
                                border: 'none',
                                borderBottom: activeTab === tab ? '3px solid var(--primary)' : '3px solid transparent',
                                color: activeTab === tab ? 'var(--primary)' : 'var(--text-secondary)',
                                fontWeight: activeTab === tab ? 700 : 500,
                                cursor: 'pointer',
                                textTransform: 'capitalize',
                                transition: 'all 0.2s'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
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

            {/* 3. Tab Content */}
            <div className="fade-in">
                {activeTab === 'overview' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                        {/* Radar Chart */}
                        <div className="card" style={{ padding: '30px' }}>
                            <h3 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>Learning Analysis Radar</h3>
                            <div style={{ height: '350px', width: '100%' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
                                        <PolarGrid stroke="var(--border)" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                        <Radar name="Student" dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.4} />
                                        <Tooltip />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Recent Activity Mini */}
                        <div className="card" style={{ padding: '30px' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', color: 'var(--text-primary)' }}>Recent Journey</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {timeline.slice(0, 3).map((item) => (
                                    <div key={item.id} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--secondary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{item.title}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'achievements' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '25px' }}>
                        {achievements.map(badge => (
                            <div key={badge.id} className="card" style={{
                                padding: '30px',
                                textAlign: 'center',
                                opacity: badge.unlocked ? 1 : 0.6,
                                filter: badge.unlocked ? 'none' : 'grayscale(100%)',
                                position: 'relative',
                                border: badge.unlocked ? '1px solid var(--primary-light)' : '1px solid var(--border)'
                            }}>
                                {!badge.unlocked && <div style={{ position: 'absolute', top: '15px', right: '15px', color: 'var(--text-secondary)' }}><Lock size={18} /></div>}
                                <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>{badge.icon}</div>
                                <h4 style={{ marginBottom: '8px', fontSize: '1.2rem', color: 'var(--text-primary)' }}>{badge.title}</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{badge.desc}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h3 style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
                            <Save size={22} color="var(--primary)" /> Persistence & Experience Settings
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            {/* Theme Switcher */}
                            <div>
                                <h4 style={{ marginBottom: '15px', color: 'var(--text-primary)' }}>Account Theme (Real-time Persistence)</h4>
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <button
                                        onClick={() => setTheme('light')}
                                        style={{
                                            flex: 1, padding: '25px', borderRadius: '15px',
                                            border: theme === 'light' ? '3px solid var(--primary)' : '1px solid var(--border)',
                                            backgroundColor: 'white', cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#F0FDF4', margin: '0 auto 15px', border: '1px solid #A7F3D0' }}></div>
                                        <span style={{ fontWeight: 700, color: '#064E3B' }}>LIGHT MODE</span>
                                    </button>
                                    <button
                                        onClick={() => setTheme('dark')}
                                        style={{
                                            flex: 1, padding: '25px', borderRadius: '15px',
                                            border: theme === 'dark' ? '3px solid var(--primary)' : '1px solid var(--border)',
                                            backgroundColor: '#064E3B', cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#022C22', margin: '0 auto 15px', border: '1px solid #059669' }}></div>
                                        <span style={{ fontWeight: 700, color: '#ECFDF5' }}>DARK MODE</span>
                                    </button>
                                </div>
                            </div>

                            {/* Font Size Selector */}
                            <div>
                                <h4 style={{ marginBottom: '15px', color: 'var(--text-primary)' }}>System Font Scaling</h4>
                                <div style={{ display: 'flex', gap: '15px', padding: '12px', backgroundColor: 'var(--secondary-light)', borderRadius: '16px' }}>
                                    {['small', 'medium', 'large'].map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setFontSize(size)}
                                            style={{
                                                flex: 1, padding: '12px', borderRadius: '10px',
                                                border: 'none',
                                                backgroundColor: fontSize === size ? 'var(--primary)' : 'transparent',
                                                color: fontSize === size ? 'white' : 'var(--text-primary)',
                                                fontWeight: 800, cursor: 'pointer',
                                                textTransform: 'uppercase',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                <p style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    Adjusting this will scale all interface text in real-time.
                                </p>
                            </div>

                            {/* Save Button */}
                            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '30px' }}>
                                <button onClick={handleSave} className="btn btn-primary" style={{ width: '100%', padding: '18px', fontSize: '1.1rem' }}>
                                    Save All System Preferences
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
