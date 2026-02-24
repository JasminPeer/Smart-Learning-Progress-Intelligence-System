import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';
import Footer from '../components/layout/Footer';
import { Brain, Eye, EyeOff } from 'lucide-react';
import loginBg from '../assets/auth/login-bg.jpg';
import logoImg from '../assets/logo.png';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            console.log("[DEBUG] Login successful, role:", data.role);

            const userRole = String(data.role || '').toLowerCase();

            if (userRole === 'admin') {
                console.log("[DEBUG] Navigating to /admin");
                navigate('/admin');
            } else {
                console.log("[DEBUG] Navigating to /dashboard/student");
                navigate('/dashboard/student');
            }
        } catch (err) {
            const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
            console.error("Login Page Error:", msg, err);
            setError(msg);
            alert("Login Error: " + msg); // Immediate feedback with server message
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'white' }}>
            {/* Mini top nav — visible on login page so Features/About links work */}
            <div className="auth-top-nav" style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 40px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E5E7EB'
            }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--text-primary)' }}>
                    <img src={logoImg} alt="LearnIQ" style={{ width: '32px', height: '32px' }} />
                    <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>LearnIQ</span>
                </Link>
                <div className="auth-top-nav-links" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <a href="/#features" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>✨ Features</a>
                    <a href="/#about" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>🏫 About Us</a>
                    <a href="/#how-it-works" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>⚙️ How it Works</a>
                    <Link to="/register" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>Sign Up Free</Link>
                </div>
            </div>
            <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap-reverse', minHeight: 'calc(100vh - 80px)' }}> {/* wrap-reverse to stack correctly on mobile if needed */}

                    {/* Left Panel - Visual (Purple Gradient) */}
                    <div className="auth-gradient auth-panel-right" style={{
                        flex: '1.2 1 500px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: '60px',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        minHeight: '400px'
                    }}>
                        {/* Background Image (Low Opacity) */}
                        <div style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                            backgroundImage: `url(${loginBg})`,
                            backgroundSize: 'cover', opacity: 0.1, pointerEvents: 'none'
                        }}></div>

                        <div style={{ zIndex: 2 }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                marginBottom: '30px',
                                backdropFilter: 'blur(10px)'
                            }}>🎓</div>
                            <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '20px', lineHeight: 1.1, color: 'white' }}>
                                Start Your <br />Smart Learning <br />Journey
                            </h1>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '5px', borderRadius: '50%', display: 'flex' }}>✓</span>
                                    <span>Track your academic progress in real-time</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '5px', borderRadius: '50%', display: 'flex' }}>✓</span>
                                    <span>Get personalized learning recommendations</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '5px', borderRadius: '50%', display: 'flex' }}>✓</span>
                                    <span>Earn achievements and maintain streaks</span>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Circles */}
                        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)', top: '-10%', right: '-10%' }}></div>
                    </div>

                    {/* Right Panel - Login Form (White) */}
                    <div className="auth-panel-left" style={{ flex: '1 1 500px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '100%', maxWidth: '400px' }}>
                            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px', textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ width: '50px', height: '50px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                    <img src={logoImg} alt="LearnIQ Logo" style={{ width: '100%', height: 'auto' }} />
                                </div>
                                <span style={{ fontSize: '1.4rem', fontWeight: 800 }}>LearnIQ</span>
                            </Link>

                            <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Welcome back</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Please enter your details options to login.</p>

                            {error && <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#B91C1C', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}

                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" value={email} onChange={onChange} required placeholder="Enter your email" />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={password}
                                            onChange={onChange}
                                            required
                                            placeholder="••••••••"
                                            style={{ paddingRight: '45px' }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{
                                                position: 'absolute',
                                                right: '12px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: '#64748B',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: '0.9rem' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0 }}>
                                        <input type="checkbox" /> Remember for 30 days
                                    </label>
                                    <Link to="#" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Forgot password?</Link>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>Sign in</button>
                            </form>

                            <p style={{ marginTop: '25px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
                            </p>


                            <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#F9FAFB', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                                <strong style={{ display: 'block', marginBottom: '15px', color: 'var(--text-primary)' }}>Quick Access (Demo):</strong>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    <button className="btn" type="button" style={{ fontSize: '0.75rem', padding: '8px', backgroundColor: '#E0E7FF', color: '#4338CA' }} onClick={() => setFormData({ email: 'student@test.com', password: '123456' })}>Student Role</button>
                                    <button className="btn" type="button" style={{ fontSize: '0.75rem', padding: '8px', backgroundColor: '#FEF3C7', color: '#B45309' }} onClick={() => setFormData({ email: 'admin@test.com', password: '123456' })}>Admin Role</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Login;
