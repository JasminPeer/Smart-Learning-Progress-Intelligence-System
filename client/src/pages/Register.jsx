import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';
import Footer from '../components/layout/Footer';
import { Brain } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', educationLevel: '', mobileNumber: '', email: '', password: '', role: 'student' });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const { name, educationLevel, mobileNumber, email, password, role } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, educationLevel, mobileNumber, email, password, role);
            if (role === 'admin') navigate('/dashboard/admin');
            else navigate('/onboarding'); // Redirect to Onboarding for students
        } catch (err) {
            const msg = err.response?.data?.message || 'Registration failed. Please check your network connection.';
            console.error("Register Page Error:", msg);
            setError(msg);
            alert("Error: " + msg); // Immediate feedback for the user
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'white' }}>
            <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: 'calc(100vh - 80px)' }}> {/* Responsive Wrap */}

                    {/* Left Panel - Register Form (Swapped) */}
                    <div style={{ flex: '1 1 500px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '100%', maxWidth: '450px' }}>
                            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ width: '30px', height: '30px', color: 'var(--primary)', position: 'relative' }}>
                                    <Brain size={30} strokeWidth={2} />
                                </div>
                                <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>LearnIQ</span>
                            </Link>

                            <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Create your account</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Join thousands of students improving their learning.</p>

                            {error && <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#B91C1C', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}

                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" name="name" value={name} onChange={onChange} required placeholder="Enter your full name" />
                                </div>
                                <div className="form-group">
                                    <label>Education Level</label>
                                    <input type="text" name="educationLevel" value={educationLevel} onChange={onChange} required placeholder="e.g. Class 10, UG, PG" />
                                </div>
                                <div className="form-group">
                                    <label>Mobile Number</label>
                                    <input type="text" name="mobileNumber" value={mobileNumber} onChange={onChange} required placeholder="Enter your mobile number" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" value={email} onChange={onChange} required placeholder="Enter your email" />
                                </div>

                                <div className="form-group" style={{ display: 'none' }}>
                                    <label>I am a...</label>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                        <label style={{
                                            border: role === 'student' ? '2px solid var(--primary)' : '1px solid var(--border)',
                                            padding: '10px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center',
                                            backgroundColor: role === 'student' ? 'var(--secondary-light)' : 'transparent',
                                            fontWeight: role === 'student' ? '600' : '400', color: role === 'student' ? 'var(--primary)' : 'inherit',
                                            transition: 'all 0.2s'
                                        }}>
                                            <input type="radio" name="role" value="student" checked={role === 'student'} onChange={onChange} style={{ display: 'none' }} />
                                            Student
                                        </label>
                                        <label style={{
                                            border: role === 'admin' ? '2px solid var(--primary)' : '1px solid var(--border)',
                                            padding: '10px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center',
                                            backgroundColor: role === 'admin' ? 'var(--secondary-light)' : 'transparent',
                                            fontWeight: role === 'admin' ? '600' : '400', color: role === 'admin' ? 'var(--primary)' : 'inherit',
                                            transition: 'all 0.2s'
                                        }}>
                                            <input type="radio" name="role" value="admin" checked={role === 'admin'} onChange={onChange} style={{ display: 'none' }} />
                                            Admin
                                        </label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" name="password" value={password} onChange={onChange} required placeholder="Create a password" />
                                    <small style={{ color: 'var(--text-secondary)', marginTop: '5px', display: 'block' }}>Must be at least 6 characters</small>
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>Create Account</button>
                            </form>

                            <p style={{ marginTop: '25px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
                            </p>
                        </div>
                    </div>

                    {/* Right Panel - Visual (Swapped) */}
                    <div className="auth-gradient" style={{
                        flex: '1 1 500px',
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
                            background: 'url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")', // Example Student/Group image
                            backgroundSize: 'cover', opacity: 0.1, pointerEvents: 'none'
                        }}></div>

                        {/* Floating Elements */}
                        <div style={{ position: 'absolute', top: '20%', right: '20%', animation: 'float 6s infinite' }}>
                            <div style={{ fontSize: '4rem', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }}>🚀</div>
                        </div>

                        <div style={{ zIndex: 2 }}>
                            <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '20px' }}>Join Our Community</h1>
                            <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '40px', maxWidth: '500px', lineHeight: 1.6 }}>
                                Create an account to access advanced learning analytics, track your goals, and collaborate with peers.
                            </p>

                            <div className="glass" style={{ padding: '25px', borderRadius: '16px', maxWidth: '450px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                                    <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#fff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>SJ</div>
                                    <div>
                                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Sarah Jenkins</div>
                                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Computer Science Student</div>
                                    </div>
                                </div>
                                <p style={{ fontStyle: 'italic', fontSize: '1rem', lineHeight: 1.5 }}>"LearnIQ helped me improve my grades by 25% in just one semester through targeted recommendations."</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Register;
