import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';
import { User, Bell, Shield, Palette, HelpCircle, Save, Lock, Smartphone, Mail, Eye, Globe } from 'lucide-react';

const Settings = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        if (location.state && location.state.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state]);

    const TabButton = ({ id, icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '16px 24px', width: '100%', border: 'none',
                background: activeTab === id ? '#EEF2FF' : 'transparent',
                color: activeTab === id ? '#4F46E5' : '#64748B',
                cursor: 'pointer', transition: 'all 0.2s',
                borderRadius: '12px', fontWeight: activeTab === id ? 700 : 500,
                textAlign: 'left'
            }}
        >
            {icon}
            {label}
        </button>
    );

    const SettingRow = ({ title, description, control }) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, marginBottom: '5px', color: '#1E293B' }}>{title}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748B' }}>{description}</div>
            </div>
            <div>{control}</div>
        </div>
    );

    return (
        <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '10px' }}>Settings</h1>
                <p style={{ color: '#64748B' }}>Manage your LearnIQ account, privacy, and preferences.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', maxWidth: '800px', margin: '0 auto' }}>
                {/* Tabs - Now horizontal for better centering */}
                <div style={{ display: 'flex', overflowX: 'auto', gap: '10px', paddingBottom: '10px', justifyContent: 'center' }}>
                    <button onClick={() => setActiveTab('profile')} style={{ background: activeTab === 'profile' ? '#EEF2FF' : 'white', border: '1px solid #E2E8F0', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: activeTab === 'profile' ? 700 : 500, color: activeTab === 'profile' ? '#4F46E5' : '#64748B' }}><User size={18} /> Info</button>
                    <button onClick={() => setActiveTab('security')} style={{ background: activeTab === 'security' ? '#EEF2FF' : 'white', border: '1px solid #E2E8F0', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: activeTab === 'security' ? 700 : 500, color: activeTab === 'security' ? '#4F46E5' : '#64748B' }}><Shield size={18} /> Security</button>
                    <button onClick={() => setActiveTab('notifications')} style={{ background: activeTab === 'notifications' ? '#EEF2FF' : 'white', border: '1px solid #E2E8F0', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: activeTab === 'notifications' ? 700 : 500, color: activeTab === 'notifications' ? '#4F46E5' : '#64748B' }}><Bell size={18} /> Alerts</button>
                    <button onClick={() => setActiveTab('appearance')} style={{ background: activeTab === 'appearance' ? '#EEF2FF' : 'white', border: '1px solid #E2E8F0', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: activeTab === 'appearance' ? 700 : 500, color: activeTab === 'appearance' ? '#4F46E5' : '#64748B' }}><Palette size={18} /> Design</button>
                </div>

                {/* Content Area */}
                <div className="card" style={{ padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    {activeTab === 'profile' && (
                        <div>
                            <h2 style={{ marginBottom: '10px' }}>Personal Info</h2>
                            <p style={{ color: '#64748B', marginBottom: '30px' }}>Info about you and your preferences across LearnIQ services.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                                <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#4F46E5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800 }}>
                                        {user?.name?.charAt(0)}
                                    </div>
                                    <button className="btn" style={{ background: '#F1F5F9', color: '#4F46E5', padding: '8px 16px' }}>Change Photo</button>
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <SettingRow title="Display Name" description="Your name as it appears to instructors and peers." control={<input type="text" defaultValue={user?.name} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }} />} />
                                    <SettingRow title="Email" description="Primary email for notifications and recovery." control={<span>{user?.email}</span>} />
                                    <SettingRow title="Location" description="Set your local time zone." control={<select style={{ padding: '8px', borderRadius: '8px' }}><option>India (GMT+5:30)</option><option>USA (PST)</option></select>} />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div>
                            <h2 style={{ marginBottom: '10px' }}>Security</h2>
                            <p style={{ color: '#64748B', marginBottom: '30px' }}>Settings and recommendations to help you keep your account secure.</p>

                            <SettingRow title="Password" description="Last changed 3 months ago" control={<button className="btn" style={{ background: '#F1F5F9' }}>Update</button>} />
                            <SettingRow title="Two-step verification" description="Add an extra layer of security to your account." control={<input type="checkbox" defaultChecked />} />
                            <SettingRow title="Connected Devices" description="You are currently logged in on 2 devices." control={<button className="btn" style={{ background: '#FFF1F2', color: '#E11D48' }}>Manage</button>} />

                            <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <Lock size={24} color="#4F46E5" />
                                    <div>
                                        <div style={{ fontWeight: 700 }}>Privacy Checkup</div>
                                        <p style={{ margin: '5px 0 15px', fontSize: '0.85rem' }}>Review the data that LearnIQ saves in your account and choose how it is used.</p>
                                        <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Take Checkup</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div>
                            <h2 style={{ marginBottom: '10px' }}>Notifications</h2>
                            <p style={{ color: '#64748B', marginBottom: '30px' }}>Manage how and when you receive alerts from LearnIQ.</p>

                            <SettingRow title="Email Notifications" description="Receive course updates and performance reports via email." control={<input type="checkbox" defaultChecked />} />
                            <SettingRow title="Push Notifications" description="Get instant alerts for new lectures and assignments." control={<input type="checkbox" defaultChecked />} />
                            <SettingRow title="SMS Alerts" description="Important deadlines via text message." control={<input type="checkbox" />} />
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div>
                            <h2 style={{ marginBottom: '10px' }}>Appearance</h2>
                            <p style={{ color: '#64748B', marginBottom: '30px' }}>Customize your dashboard theme and layout.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                                <div style={{ padding: '20px', border: '2px solid #4F46E5', borderRadius: '12px', textAlign: 'center' }}>
                                    <div style={{ height: '60px', backgroundColor: '#F8FAFC', borderRadius: '8px', marginBottom: '10px' }}></div>
                                    <div style={{ fontWeight: 700 }}>Light Theme</div>
                                </div>
                                <div style={{ padding: '20px', border: '1px solid #E2E8F0', borderRadius: '12px', textAlign: 'center', opacity: 0.6 }}>
                                    <div style={{ height: '60px', backgroundColor: '#1E293B', borderRadius: '8px', marginBottom: '10px' }}></div>
                                    <div style={{ fontWeight: 700 }}>Dark Theme</div>
                                </div>
                            </div>

                            <SettingRow title="Sidebar Layout" description="Choose between expanded or collapsed sidebar by default." control={<select><option>Expanded</option><option>Icon Only</option></select>} />
                            <SettingRow title="Font Size" description="Adjust text size for better readability." control={<input type="range" min="12" max="24" defaultValue="16" />} />
                        </div>
                    )}

                    {activeTab === 'support' && (
                        <div>
                            <h2 style={{ marginBottom: '10px' }}>Support & FAQ</h2>
                            <p style={{ color: '#64748B', marginBottom: '30px' }}>Find answers to common questions or contact our team.</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <details style={{ padding: '15px', border: '1px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer' }}>
                                    <summary style={{ fontWeight: 700 }}>How do I earn a certificate?</summary>
                                    <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#64748B' }}>To earn a certificate, you must complete all lectures in a course and pass the final assessment with a score of 70% or higher.</p>
                                </details>
                                <details style={{ padding: '15px', border: '1px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer' }}>
                                    <summary style={{ fontWeight: 700 }}>Can I download lectures for offline use?</summary>
                                    <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#64748B' }}>Currently, video lectures are available for online streaming only. However, you can download course transcripts and notes.</p>
                                </details>
                            </div>

                            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                                <p>Still need help?</p>
                                <button className="btn btn-primary" style={{ marginTop: '10px' }}>Contact Support Team</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
