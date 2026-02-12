import { useState, useContext } from 'react';
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
    Shield
} from 'lucide-react';
import AuthContext from '../../auth/AuthContext';

const DashboardLayout = ({ role, children }) => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/" replace />;
    }

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const handleHeaderNavigation = (tab) => {
        navigate('/settings', { state: { activeTab: tab } });
    };

    const NavItem = ({ to, icon, label }) => {
        const isActive = location.pathname === to;

        const handleClick = (e) => {
            if (user?.isDemo) {
                e.preventDefault(); // Stop navigation
                window.location.href = '/register'; // Force redirect to register as requested
            }
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
                            <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--primary-light)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <BookOpen size={20} color="white" />
                            </div>
                            <div>
                                <div style={{ fontSize: '1rem', fontWeight: 700 }}>LearnIQ</div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--primary-light)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <BookOpen size={20} color="white" />
                        </div>
                    )}
                </div>

                {/* Navigation Links */}
                <div style={{ flexGrow: 1, padding: '0 5px' }}>
                    {isSidebarOpen && <div style={{ padding: '0 20px 10px', fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Menu</div>}

                    {/* Student Navigation */}
                    {user?.role === 'student' && (
                        <>
                            <NavItem to="/dashboard/student" icon={<LayoutDashboard size={20} />} label="Dashboard" />
                            <NavItem to="/courses" icon={<BookOpen size={20} />} label="My Courses" />
                            <NavItem to="/progress" icon={<TrendingUp size={20} />} label="Progress" />
                            <NavItem to="/achievements" icon={<Award size={20} />} label="Achievements" />
                        </>
                    )}

                    {/* Admin Navigation */}
                    {user?.role === 'admin' && (
                        <>
                            <NavItem to="/dashboard/admin" icon={<LayoutDashboard size={20} />} label="Overview" />
                            <NavItem to="/dashboard/admin/users" icon={<Users size={20} />} label="User Mgmt" />
                            <NavItem to="/dashboard/admin/courses" icon={<BookOpen size={20} />} label="Manage Courses" />
                            <NavItem to="/dashboard/admin/system" icon={<Shield size={20} />} label="System" />
                        </>
                    )}

                    <div style={{ margin: '20px 0', borderTop: '1px solid #1E293B' }}></div>

                    <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
                </div>

                {/* Logout */}
                <div style={{ padding: '20px', borderTop: '1px solid #1E293B' }}>
                    <button onClick={logout} style={{
                        display: 'flex', alignItems: 'center',
                        background: 'none', border: 'none',
                        cursor: 'pointer', width: '100%',
                        color: '#EF4444', // Red 500
                        padding: '10px 20px',
                        borderRadius: '8px',
                        transition: 'background 0.2s',
                        justifyContent: isSidebarOpen ? 'flex-start' : 'center'
                    }}>
                        <LogOut size={20} />
                        {isSidebarOpen && <span style={{ marginLeft: '12px' }}>Logout</span>}
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>

                {/* Top Navbar (Light) */}
                <header style={{
                    height: 'auto', minHeight: '70px',
                    backgroundColor: 'white',
                    borderBottom: '1px solid #E2E8F0',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center',
                    zIndex: 10
                }}>
                    {user?.isDemo && (
                        <div style={{ backgroundColor: '#F59E0B', color: 'white', fontSize: '0.85rem', textAlign: 'center', padding: '6px', fontWeight: 600 }}>
                            You are viewing a demo. <Link to="/register" style={{ color: 'white', textDecoration: 'underline' }}>Sign up</Link> to unlock full features.
                        </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 40px', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                                <Menu size={24} />
                            </button>
                            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#1E293B' }}>
                                {(() => {
                                    const part = location.pathname.split('/').filter(Boolean).pop();
                                    if (!part || part === 'student') return 'Dashboard';
                                    return part.charAt(0).toUpperCase() + part.slice(1);
                                })()}
                            </h2>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                            <div
                                onClick={() => navigate('/settings', { state: { activeTab: 'notifications' } })}
                                style={{ position: 'relative', cursor: 'pointer', padding: '5px' }}
                            >
                                <Bell size={22} color="#64748B" />
                                <div style={{ position: 'absolute', top: '2px', right: '2px', width: '10px', height: '10px', backgroundColor: '#EF4444', borderRadius: '50%', border: '2px solid white' }}></div>
                            </div>

                            <div
                                onClick={() => navigate('/settings', { state: { activeTab: 'profile' } })}
                                style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '5px 12px', borderRadius: '30px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}
                            >
                                <div style={{
                                    width: '32px', height: '32px',
                                    backgroundColor: '#4F46E5',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'white', fontWeight: 'bold', fontSize: '0.9rem'
                                }}>
                                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <ChevronDown size={14} color="#64748B" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Main Content */}
                <main style={{ flexGrow: 1, padding: '30px', overflowY: 'auto' }}>
                    {children ? children : <Outlet />}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
