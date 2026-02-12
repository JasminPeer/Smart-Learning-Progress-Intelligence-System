import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" style={{ fontSize: '1.6rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '12px', color: 'white', textDecoration: 'none' }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <div style={{ color: '#A7F3D0' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2.1a5 5 0 0 1 5 0" /><path d="M16 3.1a5 5 0 0 1 5.1 5.1c0 2.5-2 4.1-3.6 5.3s-2.1 2.5-2.1 4.5V20a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2c0-2-0.5-3.3-2.1-4.5s-3.6-2.8-3.6-5.3a5 5 0 0 1 5.1-5.1" /><path d="M15 13a3 3 0 0 0-6 0" /><path d="M12 7v4" /><path d="M8 12 10.5 9.5" /><path d="M16 12 13.5 9.5" /></svg>
                        </div>
                        <div style={{ position: 'absolute', top: '-5px', right: '-8px', fontSize: '1rem' }}>🎓</div>
                    </div>
                    <span style={{ letterSpacing: '0.5px', background: 'linear-gradient(to right, #A7F3D0, #FFFFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>LearnIQ</span>
                </Link>
                <div className="nav-links">
                    <Link to="/" onClick={(e) => {
                        if (window.location.pathname === '/') {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    }}>Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>

                    {user ? (
                        <>
                            {user.role === 'student' && <Link to="/dashboard/student">Dashboard</Link>}
                            {user.role === 'instructor' && <Link to="/dashboard/instructor">Dashboard</Link>}
                            {user.role === 'admin' && <Link to="/dashboard/admin">Dashboard</Link>}
                            <button onClick={onLogout} className="btn" style={{ backgroundColor: 'transparent', border: '1px solid white', padding: '5px 15px', color: 'white' }}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
