import { motion } from 'framer-motion';
import { Lock, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LockedConceptPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            textAlign: 'center',
            background: 'var(--bg-main)',
            position: 'relative'
        }}>
            {/* Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate('/')}
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '1rem'
                }}
            >
                <ArrowLeft size={20} /> Back to Home
            </motion.button>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="card"
                onClick={() => navigate('/register')}
                style={{
                    maxWidth: '500px',
                    width: '100%',
                    padding: '60px 40px',
                    cursor: 'pointer',
                    border: '2px dashed var(--border)',
                    background: 'white',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Visual Flair */}
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05 }}>
                    <Sparkles size={160} />
                </div>

                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: '#FEE2E2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '30px',
                    color: '#EF4444'
                }}>
                    <Lock size={48} strokeWidth={2.5} />
                </div>

                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>
                    Locked Component
                </h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.6 }}>
                    This section is part of the **LearnIQ Premium Experience**.
                    Please register to unlock full analytics, courses, and personalized tracking.
                </p>

                <div style={{
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 10px 20px rgba(5, 150, 105, 0.2)'
                }}>
                    <ShieldCheck size={24} /> Unlock after Registration
                </div>

                <p style={{ marginTop: '25px', fontSize: '0.9rem', color: '#94A3B8', fontWeight: 500 }}>
                    Click anywhere on this card to get started
                </p>
            </motion.div>
        </div>
    );
};

export default LockedConceptPage;
