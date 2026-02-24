import { useRef, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Sparkles, TrendingUp, BarChart3, Brain, Target, Shield, UserPlus, BookOpen, Zap, ArrowRight, CheckCircle2, Menu, X } from 'lucide-react';
import AuthContext from '../auth/AuthContext';
import Footer from '../components/layout/Footer';
import logoImg from '../assets/logo.png';

// Scroll Animation Wrapper
const FadeIn = ({ children, delay = 0, direction = "up" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 40 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut", delay }
        }
    };

    return (
        <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={variants}>
            {children}
        </motion.div>
    );
};

const Index = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleDemoLogin = async () => {
        if (isLoggingIn) return;
        setIsLoggingIn(true);
        console.log("[Hero] Attempting demo login...");
        try {
            const data = await login('demo@learniq.com', '123456');
            console.log("[Hero] Demo login success, role:", data.role);
            navigate('/dashboard/student');
        } catch (error) {
            console.error("Demo login failed", error);
            alert("Guest login is currently unavailable. Please try again in 1 minute while the server wakes up.");
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
            {/* Navbar - Sticky */}
            <nav className="glass index-nav" style={{
                padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                position: 'sticky', top: 0, zIndex: 1000, margin: '0 20px 0', marginTop: '20px', borderRadius: '16px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="index-nav-logo-img" style={{ width: '60px', height: '60px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <img src={logoImg} alt="LearnIQ Logo" style={{ width: '100%', height: 'auto' }} />
                    </div>
                    <span className="index-nav-logo-text" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>LearnIQ</span>
                </div>
                {/* Desktop nav links */}
                <div className="index-nav-links" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                    <span style={{ cursor: 'pointer', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.95rem' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</span>
                    <a href="#features" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.95rem' }}>Features</a>
                    <a href="#about" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.95rem' }}>About Us</a>
                    <a href="#how-it-works" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.95rem' }}>How it Works</a>
                    <Link to="/login" style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.95rem' }}>Log In</Link>
                    <Link to="/register" className="btn btn-primary" style={{ padding: '10px 24px' }}>Get Started</Link>
                </div>
                {/* Mobile hamburger button */}
                <div className="index-nav-mobile-menu" style={{ display: 'none', alignItems: 'center' }}>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', display: 'flex', alignItems: 'center' }}>
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>
            {/* Mobile dropdown menu */}
            {mobileMenuOpen && (
                <div style={{
                    position: 'fixed', top: '90px', left: '10px', right: '10px', zIndex: 999,
                    backgroundColor: 'white', borderRadius: '16px', padding: '20px 24px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)', border: '1px solid var(--border)',
                    display: 'flex', flexDirection: 'column', gap: '18px'
                }}>
                    <span style={{ cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 600, fontSize: '1rem' }} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}>🏠 Home</span>
                    <a href="#features" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600, fontSize: '1rem' }}>✨ Features</a>
                    <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600, fontSize: '1rem' }}>🏫 About Us</a>
                    <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600, fontSize: '1rem' }}>⚙️ How it Works</a>
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '14px', display: 'flex', gap: '12px' }}>
                        <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn" style={{ flex: 1, justifyContent: 'center', border: '1px solid var(--border)', color: 'var(--text-primary)', backgroundColor: 'white' }}>Log In</Link>
                        <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Get Started</Link>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <header style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                padding: '50px 20px 80px', position: 'relative', overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '100%', height: '100%',
                    background: 'radial-gradient(circle at 50% 50%, rgba(5, 150, 105, 0.05) 0%, rgba(255,255,255,0) 70%)',
                    zIndex: -1
                }}></div>

                {/* Floating Elements */}
                <div className="hero-float-icon" style={{ position: 'absolute', top: '20%', left: '10%', animation: 'float 5s infinite' }}>
                    <div className="card" style={{ padding: '15px', borderRadius: '18px', transform: 'rotate(-5deg)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                        <BarChart3 color="var(--primary)" size={36} />
                    </div>
                </div>

                {/* New Icon 1: Book */}
                <div className="hero-float-icon" style={{ position: 'absolute', bottom: '15%', left: '25%', animation: 'float 6s ease-in-out infinite' }}>
                    <div className="card" style={{ padding: '12px', borderRadius: '15px', transform: 'rotate(-5deg)', boxShadow: '0 15px 30px rgba(0,0,0,0.05)' }}>
                        <BookOpen color="var(--calm-blue)" size={28} />
                    </div>
                </div>
                {/* New Icon 2: Zap */}
                <div className="hero-float-icon" style={{ position: 'absolute', top: '15%', right: '10%', animation: 'float-reverse 7s infinite' }}>
                    <div className="card" style={{ padding: '14px', borderRadius: '15px', transform: 'rotate(5deg)', boxShadow: '0 15px 30px rgba(0,0,0,0.05)' }}>
                        <Zap color="var(--interest-orange)" size={28} />
                    </div>
                </div>
                <div className="hero-float-icon" style={{ position: 'absolute', bottom: '20%', right: '10%', animation: 'float-reverse 6s infinite' }}>
                    <div className="card" style={{ padding: '18px', borderRadius: '18px', transform: 'rotate(5deg)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                        <Target color="var(--interest-orange)" size={40} />
                    </div>
                </div>

                <FadeIn>
                    <div className="hero-badge" style={{
                        backgroundColor: '#D1FAE5', color: 'var(--primary-dark)',
                        padding: '8px 20px', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 700,
                        marginBottom: '30px', display: 'inline-flex', alignItems: 'center', gap: '8px'
                    }}>
                        <span style={{ fontSize: '1.1rem' }}>✨</span> <span>AI-Powered Learning Platform for All Levels</span>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <h1 className="hero-title" style={{
                        fontSize: '4.5rem', fontWeight: 900, color: 'var(--text-primary)', maxWidth: '1000px',
                        lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.04em'
                    }}>
                        Unlock Your <span style={{ color: 'var(--primary)' }}>Cosmic Potential</span> <br />
                        with Smart, Adaptive Learning
                    </h1>
                </FadeIn>

                <FadeIn delay={0.4}>
                    <p className="hero-subtitle" style={{
                        fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '800px',
                        marginBottom: '48px', lineHeight: 1.6, fontWeight: 500
                    }}>
                        From School foundations to NEET/JEE peaks and University degrees—LearnIQ is your intelligent companion.
                        Experience the fusion of expert curriculum and smart technology.
                    </p>
                </FadeIn>

                <div className="hero-buttons" style={{
                    display: 'flex',
                    gap: '16px',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 500,
                    marginTop: '30px',
                    pointerEvents: 'auto'
                }}>
                    <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '16px 40px' }}>Join Free Now</Link>
                    <button
                        onClick={handleDemoLogin}
                        className="btn"
                        id="guest-login-btn"
                        style={{
                            fontSize: '1.1rem',
                            padding: '16px 30px',
                            backgroundColor: 'white',
                            border: '1px solid var(--border)',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            position: 'relative',
                            zIndex: 501,
                            transition: 'all 0.2s ease',
                            pointerEvents: 'auto'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#F0FDF4';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        Explore as Guest
                    </button>
                </div>
            </header>

            {/* How It Works (3 Steps) */}
            <section id="how-it-works" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <FadeIn>
                            <h2 style={{ fontSize: '2.75rem', marginBottom: '16px' }}>How LearnIQ Works</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Get started in minutes and unlock your full learning potential.</p>
                        </FadeIn>
                    </div>

                    <div className="grid-cols-3">
                        <StepCard
                            icon={<UserPlus size={28} color="white" />}
                            bg="var(--primary)"
                            title="Create Your Profile"
                            desc="Sign up and set your learning goals, subjects, and preferences."
                            delay={0}
                        />
                        <StepCard
                            icon={<BookOpen size={28} color="white" />}
                            bg="var(--calm-blue)"
                            title="Track Your Progress"
                            desc="Your instructors add scores and attendance, building your learning profile."
                            delay={0.2}
                        />
                        <StepCard
                            icon={<Zap size={28} color="white" />}
                            bg="var(--primary-dark)"
                            title="Get Smart Insights"
                            desc="Receive AI-powered recommendations and watch your performance soar."
                            delay={0.4}
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" style={{ padding: '150px 20px', backgroundColor: 'var(--bg-main)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '100px' }}>
                        <FadeIn>
                            <h2 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: 800 }}>Powerful Features</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Explore the tools designed to accelerate your growth.</p>
                        </FadeIn>
                    </div>

                    <div className="grid-cols-3" style={{ gap: '40px', rowGap: '100px' }}>
                        <FeatureCard icon={<BarChart3 />} title="Smart Visualizations" desc="Visualize your academic growth with interactive charts." delay={0.1} />
                        <FeatureCard icon={<Brain />} title="AI Recommendations" desc="Personalized suggestions to improve your grades." delay={0.2} />
                        <FeatureCard icon={<Target />} title="Goal Tracking" desc="Set and achieve weekly study targets." delay={0.3} />

                        <FeatureCard icon={<CheckCircle2 />} title="Attendance Monitoring" desc="Keep track of your class attendance effortlessly." delay={0.4} />
                        <FeatureCard icon={<Sparkles />} title="Gamified Learning" desc="Earn badges and maintain streaks." delay={0.5} />
                        <FeatureCard icon={<Shield />} title="Secure Data" desc="Your academic data is private and protected." delay={0.6} />
                    </div>
                </div>
            </section>

            {/* CTA Section - Ready to Transform */}
            <section style={{ padding: '120px 20px', backgroundColor: 'white' }}>
                <div className="container">
                    <FadeIn>
                        <div style={{
                            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                            borderRadius: '40px', padding: '100px 40px', textAlign: 'center', color: 'white',
                            position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px rgba(5, 150, 105, 0.2)'
                        }}>
                            {/* Decorative Circles */}
                            <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                            <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>

                            <h2 style={{ fontSize: '3.5rem', marginBottom: '25px', color: 'white', fontWeight: 800 }}>Ready to Transform Your Learning?</h2>
                            <p style={{ fontSize: '1.4rem', marginBottom: '50px', opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>
                                Join thousands of students who are already achieving their academic goals with LearnIQ.
                            </p>
                            <Link to="/register" style={{
                                display: 'inline-flex', alignItems: 'center', gap: '12px',
                                textDecoration: 'none', backgroundColor: 'white', color: 'var(--primary)',
                                padding: '18px 50px', borderRadius: '14px', fontWeight: 800, fontSize: '1.2rem',
                                boxShadow: '0 15px 30px rgba(0,0,0,0.15)', transition: 'transform 0.2s'
                            }}>
                                Get Started Free <ArrowRight size={24} />
                            </Link>

                            <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', gap: '40px', fontSize: '1rem', opacity: 0.9 }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={20} /> Free to start</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={20} /> No credit card</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={20} /> Cancel anytime</span>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" style={{ padding: '100px 20px', backgroundColor: 'var(--bg-main)' }}>
                <div className="container">
                    <FadeIn>
                        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
                            <h2 className="about-title" style={{ fontSize: '2.75rem', marginBottom: '16px', fontWeight: 800 }}>About LearnIQ</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                                Built by students, for students — LearnIQ is your AI-powered companion for smarter, faster academic growth.
                            </p>
                        </div>
                    </FadeIn>
                    <div className="about-grid" style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {/* Left — Story */}
                        <div style={{ flex: '1 1 340px' }}>
                            <FadeIn delay={0.1}>
                                <div className="card" style={{ padding: '40px' }}>
                                    <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🎓</div>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '14px', color: 'var(--primary-dark)' }}>Our Mission</h3>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.98rem' }}>
                                        We believe every student deserves a personalized learning experience. LearnIQ combines AI, real-time analytics, and gamification
                                        to help learners of all levels — from Class 6 to post-graduate — achieve their full potential.
                                    </p>
                                </div>
                            </FadeIn>
                        </div>
                        {/* Right — Stats cards */}
                        <div style={{ flex: '1 1 340px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            {[
                                { emoji: '🚀', value: '10,000+', label: 'Active Students' },
                                { emoji: '📚', value: '50+', label: 'Courses Available' },
                                { emoji: '🏆', value: '95%', label: 'Student Satisfaction' },
                                { emoji: '🤖', value: 'AI-First', label: 'Smart Recommendations' },
                            ].map((stat, i) => (
                                <FadeIn delay={i * 0.1} key={i}>
                                    <div className="card" style={{ textAlign: 'center', padding: '28px 20px' }}>
                                        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{stat.emoji}</div>
                                        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)' }}>{stat.value}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{stat.label}</div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div >
    );
};

// Components

const StepCard = ({ icon, bg, title, desc, delay }) => (
    <FadeIn delay={delay}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
                width: '80px', height: '80px', backgroundColor: bg, borderRadius: '24px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}>
                {icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '300px' }}>{desc}</p>
        </div>
    </FadeIn>
);

const FeatureCard = ({ icon, title, desc, delay, style }) => (
    <FadeIn delay={delay}>
        <div className="card" style={{ padding: '30px', height: '100%', textAlign: 'left', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', ...style }}>
            <div style={{
                width: '50px', height: '50px', backgroundColor: 'var(--secondary-light)', color: 'var(--primary)',
                borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'
            }}>
                <div style={{ width: '24px', height: '24px' }}>{icon}</div>
            </div>
            <h3 style={{ marginBottom: '10px', fontSize: '1.25rem' }}>{title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>{desc}</p>
        </div>
    </FadeIn>
);

export default Index;
