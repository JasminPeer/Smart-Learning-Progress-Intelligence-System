import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { ShieldCheck, XCircle, Award, Calendar, User, BookOpen, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const VerifyCertificate = () => {
    const { certId } = useParams();
    const [status, setStatus] = useState('loading'); // loading, valid, invalid
    const [certData, setCertData] = useState(null);

    useEffect(() => {
        const verify = async () => {
            try {
                const { data } = await api.get(`/profile/verify/${certId}`);
                setCertData(data);
                setStatus('valid');
            } catch (err) {
                console.error("Verification failed:", err);
                setStatus('invalid');
            }
        };
        if (certId) verify();
        else setStatus('invalid');
    }, [certId]);

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#F8FAFC',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            fontFamily: 'Inter, sans-serif'
        }}>
            <Link to="/" style={{
                position: 'absolute', top: '40px', left: '40px',
                display: 'flex', alignItems: 'center', gap: '8px',
                color: '#64748B', textDecoration: 'none', fontWeight: 600
            }}>
                <ArrowLeft size={20} /> Back to LearnIQ
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    maxWidth: '600px', width: '100%',
                    backgroundColor: 'white', borderRadius: '24px',
                    padding: '50px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                    textAlign: 'center'
                }}
            >
                {status === 'loading' && (
                    <div style={{ padding: '40px' }}>
                        <div style={{ width: '50px', height: '50px', border: '5px solid #F1F5F9', borderTop: '5px solid #4F46E5', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
                        <h2 style={{ color: '#1E293B' }}>Verifying Certificate...</h2>
                        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                    </div>
                )}

                {status === 'valid' && certData && (
                    <>
                        <div style={{ backgroundColor: '#F0FDF4', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>
                            <ShieldCheck size={45} color="#22C55E" />
                        </div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1E293B', marginBottom: '10px' }}>Verified Certificate</h1>
                        <p style={{ color: '#64748B', marginBottom: '40px' }}>This certificate is authentic and was issued by LearnIQ Academy.</p>

                        {/* Visual Certificate Rendering */}
                        <div style={{ padding: '30px', border: '10px solid #F1F5F9', position: 'relative', backgroundColor: 'white', backgroundImage: 'radial-gradient(#E2E8F0 1px, transparent 1px)', backgroundSize: '20px 20px', textAlign: 'center' }}>
                            <div style={{ border: '2px solid #4F46E5', padding: '30px', position: 'relative' }}>
                                {/* <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '0 20px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4F46E5', fontWeight: 'bold' }}>LQ</div>
                                </div> */}
                                <h4 style={{ color: '#4F46E5', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.8rem', marginBottom: '20px', fontWeight: 800 }}>LearnIQ Academy</h4>

                                <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '1rem' }}>This certificate of completion is awarded to</p>
                                <h2 style={{ fontSize: '2.2rem', color: '#1E293B', margin: '15px 0', borderBottom: '2px solid #E2E8F0', paddingBottom: '10px', display: 'inline-block' }}>{certData.studentName}</h2>

                                <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '15px' }}>For successfully passing the academic evaluation of</p>
                                <h3 style={{ fontSize: '1.5rem', color: '#4F46E5', margin: '10px 0' }}>{certData.courseName}</h3>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginTop: '40px', alignItems: 'flex-end', gap: '10px' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontStyle: 'italic', marginBottom: '5px', color: '#1E293B', fontSize: '0.9rem' }}>Jasmin Peer</div>
                                        <div style={{ height: '1px', backgroundColor: '#CBD5E1', width: '80%', margin: '0 auto' }}></div>
                                        <div style={{ fontSize: '0.6rem', color: '#64748B', marginTop: '5px' }}>Academics Director</div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '4px double #4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4F46E5', fontWeight: 800, fontSize: '1.2rem' }}>LQ</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontStyle: 'italic', marginBottom: '5px', color: '#1E293B', fontSize: '0.9rem' }}>{new Date(certData.dateAwarded).toLocaleDateString()}</div>
                                        <div style={{ height: '1px', backgroundColor: '#CBD5E1', width: '80%', margin: '0 auto' }}></div>
                                        <div style={{ fontSize: '0.6rem', color: '#64748B', marginTop: '5px' }}>Date Issued</div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px', fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'monospace' }}>
                                    ID: {certData.certificateId}
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '40px', borderTop: '1px solid #F1F5F9', paddingTop: '30px' }}>
                            <p style={{ fontSize: '0.9rem', color: '#94A3B8' }}> learniq.academy/verify/{certId} </p>
                        </div>
                    </>
                )}

                {status === 'invalid' && (
                    <>
                        <div style={{ backgroundColor: '#FEF2F2', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>
                            <XCircle size={45} color="#EF4444" />
                        </div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1E293B', marginBottom: '10px' }}>Invalid Certificate</h1>
                        <p style={{ color: '#64748B', marginBottom: '40px' }}>We couldn't find a certificate with the ID: <strong style={{ color: '#1E293B' }}>{certId}</strong>. It may have been revoked or is not authentic.</p>
                        <button onClick={() => window.location.href = '/'} className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>Return to Homepage</button>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default VerifyCertificate;
