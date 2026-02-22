import { useState, useContext, useEffect } from 'react';
import { Link, useLocation, Navigate, Outlet, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    TrendingUp,
    Award,
    Settings,
    LogOut,
    ChevronDown,
    Bell,
    Menu,
    Users,
    MessageSquare,
    AlertTriangle,
    FileText,
    PieChart,
    Shield,
    Megaphone,
    X
} from 'lucide-react';
import AuthContext from '../../auth/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../assets/logo.png';

const DashboardLayout = ({ role, children }) => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);

    if (!user) {
        console.log("[DEBUG] DashboardLayout - No user, redirecting to /login");
        return <Navigate to="/login" replace />;
    }

    if (role && user.role?.toLowerCase() !== role.toLowerCase()) {
        const userRoleLower = user.role?.toLowerCase();
        const fallback = userRoleLower === 'admin' ? '/admin' : '/dashboard/student';
        console.warn("[DEBUG] DashboardLayout - Role mismatch. Expected:", role, "User role:", user.role, "Redirecting to", fallback);
        return <Navigate to={fallback} replace />;
    }

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const handleProtectedNavigation = (to) => {
        navigate(to);
    };

    const handleHeaderNavigation = (tab) => {
        navigate('/settings', { state: { activeTab: tab } });
    };

    const NavItem = ({ to, icon, label }) => {
        const isActive = location.pathname === to;

        const handleClick = (e) => {
        };

        return (
            <Link to={to} onClick={handleClick} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '14px 20px',
                color: isActive ? 'white' : '#94A3B8',
                backgroundColor: isActive ? '#4F46E5' : 'transparent',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: isActive ? 600 : 500,
                borderRadius: '8px',
                marginBottom: '5px',
                transition: 'all 0.2s',
                margin: '0 10px'
            }}>
                <span style={{ marginRight: '12px', display: 'flex', alignItems: 'center' }}>{icon}</span>
                {isSidebarOpen && <span>{label}</span>}
            </Link>
        );
    };

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F1F5F9' }}> {/* Slate 100 BG */}

            {/* Dark Sidebar - Matches Screenshot but using Brand Green */}
            <div style={{
                width: isSidebarOpen ? '280px' : '80px',
                backgroundColor: 'var(--sidebar-bg)', // Dark Emerald
                color: 'var(--sidebar-text)',
                transition: 'width 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 20,
                flexShrink: 0
            }}>
                {/* Sidebar Header / User Dropdown Mock */}
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    marginBottom: '20px',
                    display: 'flex', alignItems: 'center', justifyContent: isSidebarOpen ? 'space-between' : 'center'
                }}>
                    {isSidebarOpen ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                <img src={logoImg} alt="logo" style={{ width: '100%', height: 'auto' }} />
                            </div>
                            <div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>LearnIQ</div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ width: '50px', height: '50px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            <img src={logoImg} alt="logo" style={{ width: '100%', height: 'auto' }} />
                        </div>
                    )}
                </div>

                {/* Navigation Links */}
                <div style={{ flexGrow: 1, padding: '0 5px' }}>
                    {isSidebarOpen && <div style={{ padding: '0 20px 10px', fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Menu</div>}

                    {/* Student Navigation */}
                    {user?.role?.toLowerCase() === 'student' && (
                        <>
                            <NavItem to="/dashboard/student" icon={<LayoutDashboard size={20} />} label="Dashboard" />
                            <NavItem to="/courses" icon={<BookOpen size={20} />} label="My Courses" />
                            <NavItem to="/progress" icon={<TrendingUp size={20} />} label="Progress" />
                            <NavItem to="/achievements" icon={<Award size={20} />} label="Achievements" />
                        </>
                    )}

                    {/* Admin Navigation */}
                    {user?.role?.toLowerCase() === 'admin' && (
                        <>
                            <NavItem to="/admin" icon={<LayoutDashboard size={20} />} label="Overview" />
                            <NavItem to="/admin/users" icon={<Users size={20} />} label="User Mgmt" />
                            <NavItem to="/admin/courses" icon={<BookOpen size={20} />} label="Manage Courses" />
                            <NavItem to="/admin/system" icon={<Shield size={20} />} label="System" />
                        </>
                    )}

                    <div style={{ margin: '20px 0', borderTop: '1px solid #1E293B' }}></div>

                    <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>

                <header style={{
                    height: 'auto', minHeight: '70px',
                    backgroundColor: 'var(--bg-card)',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center',
                    zIndex: 10
                }}>
                    {user?.isDemo && (
                        <div style={{ backgroundColor: '#F59E0B', color: 'white', fontSize: '0.85rem', textAlign: 'center', padding: '6px', fontWeight: 600 }}>
                            You are viewing a demo. <Link to="/register" style={{ color: 'white', textDecoration: 'underline' }}>Sign up</Link> to unlock full features.
                        </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 60px 10px 40px', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                                <Menu size={24} />
                            </button>
                            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                                {(() => {
                                    const part = location.pathname.split('/').filter(Boolean).pop();
                                    if (!part || part === 'student') return 'Dashboard';
                                    return part.charAt(0).toUpperCase() + part.slice(1);
                                })()}
                            </h2>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginRight: '10px' }}>
                            <div
                                onClick={() => navigate('/settings', { state: { activeTab: 'notifications' } })}
                                style={{ position: 'relative', cursor: 'pointer', padding: '5px' }}
                            >
                                <Bell size={22} color="#64748B" />
                                <div style={{ position: 'absolute', top: '2px', right: '2px', width: '10px', height: '10px', backgroundColor: '#EF4444', borderRadius: '50%', border: '2px solid white' }}></div>
                            </div>

                            <div
                                onClick={() => navigate('/settings', { state: { activeTab: 'profile' } })}
                                style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '5px 12px', borderRadius: '30px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-main)' }}
                            >
                                <div style={{
                                    width: '32px', height: '32px',
                                    backgroundColor: '#4F46E5',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'white', fontWeight: 'bold', fontSize: '0.9rem'
                                }}>
                                    {user?.avatar ? (
                                        <img src={user.avatar} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                    ) : (
                                        user?.name?.charAt(0).toUpperCase() || 'U'
                                    )}
                                </div>
                                <ChevronDown size={14} color="#64748B" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Main Content */}
                <main style={{ flexGrow: 1, padding: '15px 30px 30px', overflowY: 'auto' }}>
                    {children ? children : <Outlet />}
                </main>

                {/* Global Feedback Button (Student Only) */}
                {user?.role?.toLowerCase() === 'student' && (
                    <>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowFeedbackModal(true)}
                            style={{
                                position: 'fixed',
                                bottom: '30px',
                                left: '30px',
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                backgroundColor: '#22C55E',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 10px 30px rgba(34, 197, 94, 0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 999
                            }}
                        >
                            <div style={{ position: 'relative' }}>
                                <Megaphone size={26} />
                                <div style={{ position: 'absolute', top: '-12px', right: '-12px', width: '18px', height: '18px', backgroundColor: '#FDE047', borderRadius: '50%', border: '2px solid white' }}></div>
                            </div>
                        </motion.button>

                        {/* Feedback Modal */}
                        <AnimatePresence>
                            {showFeedbackModal && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{
                                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                                        backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000
                                    }}
                                >
                                    <motion.div
                                        initial={{ scale: 0.9, y: 20 }}
                                        animate={{ scale: 1, y: 0 }}
                                        exit={{ scale: 0.9, y: 20 }}
                                        className="card" style={{ width: '450px', padding: '40px', position: 'relative' }}
                                    >
                                        <button onClick={() => setShowFeedbackModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={24} /></button>

                                        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                                            <div style={{ backgroundColor: '#EEF2FF', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
                                                <Megaphone color="#4F46E5" size={30} />
                                            </div>
                                            <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#1E293B' }}>Share Your Thoughts</h2>
                                            <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '5px' }}>Your feedback helps Luna-AI grow smarter!</p>
                                        </div>

                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            const name = e.target.name.value;
                                            const comment = e.target.comment.value;
                                            const btn = e.target.querySelector('button[type="submit"]');
                                            const originalText = btn.innerText;
                                            btn.innerText = 'Sending...';
                                            btn.disabled = true;

                                            // Placeholder service/template IDs - User must replace these
                                            // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', { from_name: name, message: comment, to_email: 'jaswebie005@gmail.com' }, 'YOUR_PUBLIC_KEY')

                                            // Using emailjs.send
                                            import('@emailjs/browser').then(emailjs => {
                                                emailjs.send('service_iq1rf99', 'template_9na3xwd', {
                                                    from_name: name,
                                                    message: comment,
                                                    to_email: 'jasminpeer006@gmail.com'
                                                }, 'HzuKL2FNiYy6D-IGF')
                                                    .then(() => {
                                                        alert("Feedback sent successfully!");
                                                        setShowFeedbackModal(false);
                                                    })
                                                    .catch((err) => {
                                                        console.error('FAILED...', err);
                                                        alert("Failed to send feedback. Please try again."); // Removed demo fallback as we have real keys now
                                                        setShowFeedbackModal(false);
                                                    })
                                                    .finally(() => {
                                                        btn.innerText = originalText;
                                                        btn.disabled = false;
                                                    });
                                            });

                                        }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Full Name</label>
                                                <input
                                                    name="name"
                                                    type="text"
                                                    defaultValue={user?.name}
                                                    required
                                                    placeholder="Enter your name"
                                                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0', outline: 'none' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Your Comment</label>
                                                <textarea
                                                    name="comment"
                                                    required
                                                    placeholder="What's on your mind?"
                                                    style={{ width: '100%', minHeight: '120px', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0', outline: 'none', resize: 'none' }}
                                                ></textarea>
                                            </div>
                                            <button type="submit" className="btn btn-primary" style={{ padding: '14px', fontSize: '1rem', fontWeight: 700, backgroundColor: '#22C55E', border: 'none' }}>Submit Feedback</button>
                                        </form>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </div>
        </div>
    );
};

export default DashboardLayout;
