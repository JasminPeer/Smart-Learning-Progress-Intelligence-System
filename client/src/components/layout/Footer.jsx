import { Link } from 'react-router-dom';
import { Brain, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', padding: '80px 0 40px' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '60px' }}> {/* Responsive Grid */}

                    {/* Brand Column */}
                    <div style={{ minWidth: '250px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <div style={{ width: '32px', height: '32px', color: 'var(--primary)', position: 'relative' }}>
                                <Brain size={32} strokeWidth={1.5} />
                            </div>
                            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>LearnIQ</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                            Empowering students and educators with intelligent, data-driven learning tools for a smarter future.
                        </p>
                    </div>

                    {/* Platform */}
                    <div>
                        <h4 style={{ marginBottom: '20px' }}>Platform</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <Link to="/" className="footer-link" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }} onClick={(e) => {
                                if (window.location.pathname === '/') {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }}>Home</Link>
                            <a href="/#features" className="footer-link" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Features</a>
                            <a href="/#how-it-works" className="footer-link" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>About Us</a>
                        </div>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 style={{ marginBottom: '20px' }}>Support</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <Link to="/help" className="footer-link" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Help Center</Link>
                            <Link to="/contact" className="footer-link" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Contact Us</Link>
                        </div>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 style={{ marginBottom: '20px' }}>Legal</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <Link to="/privacy" className="footer-link" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Privacy Policy</Link>
                            <Link to="/terms" className="footer-link" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Terms of Service</Link>
                            <Link to="/cookies" className="footer-link" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Cookie Policy</Link>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '30px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '25px', justifyContent: 'center' }}>
                        <a href="#" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}><Twitter size={20} /></a>
                        <a href="#" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}><Linkedin size={20} /></a>
                        <a href="#" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}><Instagram size={20} /></a>
                    </div>
                    <span>&copy; {new Date().getFullYear()} LearnIQ. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
