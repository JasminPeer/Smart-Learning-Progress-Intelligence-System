import { useState, useEffect, useContext } from 'react';
import AuthContext from '../auth/AuthContext';
import axios from 'axios';
import { Award, Download, ExternalLink, Calendar, Search } from 'lucide-react';

const Achievements = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.get('/api/profile/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfile(data);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const filteredAchievements = profile?.achievements?.filter(ach =>
        ach.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const handleDownload = (certTitle) => {
        const certElement = document.createElement('div');
        certElement.style.cssText = `
            width: 1000px; padding: 60px; border: 20px solid #F1F5F9; 
            text-align: center; font-family: 'Segoe UI', serif; background: white;
            color: #1E293B; box-shadow: 0 0 50px rgba(0,0,0,0.1);
        `;
        certElement.innerHTML = `
            <div style="border: 2px solid #4F46E5; padding: 60px; position: relative;">
                <div style="margin-bottom: 30px;">
                    <h1 style="font-size: 50px; color: #4F46E5; margin-bottom: 5px; letter-spacing: 5px; font-weight: 800;">LEARNIQ ACADEMY</h1>
                    <p style="color: #64748B; font-size: 18px; text-transform: uppercase; letter-spacing: 2px;">Excellence in Online Education</p>
                </div>
                
                <p style="font-size: 22px; color: #475569; margin-top: 40px;">This is to certify that</p>
                <h2 style="font-size: 45px; margin: 20px 0; border-bottom: 2px solid #E2E8F0; display: inline-block; padding-bottom: 10px; color: #1E293B;">${user?.name || "The Learner"}</h2>
                
                <p style="font-size: 22px; color: #475569;">has successfully completed the evaluation for the course</p>
                <h3 style="font-size: 32px; color: #4F46E5; margin: 20px 0;">${certTitle}</h3>
                
                <div style="margin-top: 80px; display: grid; grid-template-columns: 1fr 1fr 1fr; align-items: flex-end;">
                    <div style="text-align: center;">
                        <div style="font-style: italic; color: #1E293B; font-size: 1.2rem; margin-bottom: 5px;">Jasmin Peer</div>
                        <div style="width: 150px; height: 1px; background: #94A3B8; margin: 0 auto 10px;"></div>
                        <p style="font-size: 14px; color: #64748B;">Academics Director</p>
                    </div>
                    <div>
                        <div style="width: 100px; height: 100px; border: 5px double #4F46E5; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; color: #4F46E5; font-weight: bold; font-size: 24px;">LQ</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-style: italic; color: #1E293B; font-size: 1.2rem; margin-bottom: 5px;">${new Date().toLocaleDateString()}</div>
                        <div style="width: 150px; height: 1px; background: #94A3B8; margin: 0 auto 10px;"></div>
                        <p style="font-size: 14px; color: #64748B;">Date Issued</p>
                    </div>
                </div>
            </div>
        `;
        const blob = new Blob([certElement.outerHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${certTitle.replace(/ /g, '_')}_Certificate.html`;
        link.click();
    };

    if (loading) return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '20px' }}>
            <div style={{ width: '40px', height: '40px', border: '4px solid #E2E8F0', borderTop: '4px solid var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <p style={{ color: '#64748B', fontWeight: 600 }}>Syncing your achievements...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
    );

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '10px' }}>Achievements</h1>
                <p style={{ color: '#64748B', fontSize: '1.1rem' }}>Your verified certificates and learning milestones.</p>
            </div>

            {/* Search & Filter */}
            <div className="card" style={{ padding: '20px', marginBottom: '30px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ position: 'relative', flexGrow: 1 }}>
                    <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={20} />
                    <input
                        type="text"
                        placeholder="Search certificates..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '12px 12px 12px 45px', width: '100%', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none' }}
                    />
                </div>
            </div>

            {/* Achievements Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
                {filteredAchievements.length > 0 ? filteredAchievements.map((ach, idx) => (
                    <div key={idx} className="card" style={{ padding: '30px', position: 'relative', border: '2px solid var(--border-light)', transition: 'transform 0.3s' }}>
                        <div style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.1 }}>
                            <Award size={80} color="var(--primary)" />
                        </div>
                        <div style={{ backgroundColor: '#F0FDF4', padding: '16px', borderRadius: '16px', display: 'inline-block', marginBottom: '20px' }}>
                            <Award size={32} color="var(--primary)" />
                        </div>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '5px', color: 'var(--primary-dark)' }}>{ach.title}</h3>
                        {ach.certificateId && (
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '10px', fontFamily: 'monospace' }}>
                                ID: {ach.certificateId}
                            </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '0.9rem', marginBottom: '25px' }}>
                            <Calendar size={16} />
                            <span>Awarded on {new Date(ach.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button onClick={() => handleDownload(ach.title)} className="btn" style={{ padding: '10px 20px', backgroundColor: '#F1F5F9', color: '#1E293B', fontSize: '0.9rem', gap: '8px' }}>
                                <Download size={18} /> Download
                            </button>
                            <button
                                onClick={() => ach.certificateId ? window.open(`/verify/${ach.certificateId}`, '_blank') : alert("No verification ID found for this legacy certificate.")}
                                className="btn"
                                style={{ padding: '10px 20px', backgroundColor: 'transparent', color: 'var(--primary)', border: '1px solid var(--primary)', fontSize: '0.9rem', gap: '8px' }}
                            >
                                <ExternalLink size={18} /> Verify
                            </button>
                        </div>
                    </div>
                )) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 20px' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🏅</div>
                        <h2 style={{ color: '#1E293B', marginBottom: '10px' }}>No achievements yet</h2>
                        <p style={{ color: '#64748B' }}>Complete your first course and pass the assessment to unlock certificates!</p>
                        <button onClick={() => window.location.href = '/courses'} className="btn btn-primary" style={{ marginTop: '30px' }}>Browse Courses</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Achievements;
