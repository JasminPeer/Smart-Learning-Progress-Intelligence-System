import logo from '../assets/logo.png';

const Navbar = () => {
    // ... code truncated ...
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
                        <div style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center' }}>
                            <img src={logo} alt="LearnIQ Logo" style={{ width: '100%', height: 'auto' }} />
                        </div>
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
                            {user.role?.toLowerCase() === 'student' && <Link to="/dashboard/student">Dashboard</Link>}
                            {user.role?.toLowerCase() === 'instructor' && <Link to="/dashboard/instructor">Dashboard</Link>}
                            {user.role?.toLowerCase() === 'admin' && <Link to="/admin">Dashboard</Link>}
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
