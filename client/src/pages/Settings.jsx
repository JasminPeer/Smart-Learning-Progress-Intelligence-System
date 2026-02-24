import { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/api';
import AuthContext from '../auth/AuthContext';
import { User, Bell, Shield, Palette, HelpCircle, Save, Lock, Smartphone, Mail, Eye, Globe, LogOut, Camera, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
    const { user, updateUser, logout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [showPassword, setShowPassword] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [notifLoading, setNotifLoading] = useState(false);

    useEffect(() => {
        if (activeTab === 'notifications') {
            fetchNotifications();
        }
    }, [activeTab]);

    const fetchNotifications = async () => {
        setNotifLoading(true);
        try {
            const { data } = await api.get('/notifications');
            setNotifications(data);
        } catch (err) {
            console.error("Failed to fetch notifications:", err);
        } finally {
            setNotifLoading(false);
        }
    };

    const handleUpdateNotif = async (id, updates) => {
        try {
            const { data: updated } = await api.put(`/notifications/${id}`, updates);
            setNotifications(notifications.map(n => n._id === id ? updated : n));
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    const handleDeleteNotif = async (id) => {
        if (!window.confirm("Delete this notification?")) return;
        try {
            await api.delete(`/notifications/${id}`);
            setNotifications(notifications.filter(n => n._id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                alert('Image size must be less than 1MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = reader.result;
                try {
                    await updateUser({ avatar: base64String });
                } catch (err) {
                    console.error("Avatar update failed:", err);
                }
            };
            reader.readAsDataURL(file);
        }
    };

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid var(--border)' }}>
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, marginBottom: '5px', color: 'var(--text-primary)' }}>{title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{description}</div>
            </div>
            <div>{control}</div>
        </div>
    );

    return (
        <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '10px' }}>Settings</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Manage your LearnIQ account, privacy, and preferences.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', maxWidth: '800px', margin: '0 auto' }}>
                {/* Tabs - Now horizontal for better centering */}
                <div style={{ display: 'flex', overflowX: 'auto', gap: '10px', paddingBottom: '10px', justifyContent: 'center' }}>
                    <button onClick={() => setActiveTab('profile')} style={{ background: activeTab === 'profile' ? '#EEF2FF' : 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: activeTab === 'profile' ? 700 : 500, color: activeTab === 'profile' ? '#4F46E5' : 'var(--text-secondary)' }}><User size={18} /> Info</button>
                    <button onClick={() => setActiveTab('security')} style={{ background: activeTab === 'security' ? '#EEF2FF' : 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: activeTab === 'security' ? 700 : 500, color: activeTab === 'security' ? '#4F46E5' : 'var(--text-secondary)' }}><Shield size={18} /> Security</button>
                    <button onClick={() => setActiveTab('notifications')} style={{ background: activeTab === 'notifications' ? '#EEF2FF' : 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: activeTab === 'notifications' ? 700 : 500, color: activeTab === 'notifications' ? '#4F46E5' : 'var(--text-secondary)' }}><Bell size={18} /> Alerts</button>
                    <button onClick={() => setActiveTab('appearance')} style={{ background: activeTab === 'appearance' ? '#EEF2FF' : 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: activeTab === 'appearance' ? 700 : 500, color: activeTab === 'appearance' ? '#4F46E5' : 'var(--text-secondary)' }}><Palette size={18} /> Design</button>
                    {user?.role !== 'admin' && (
                        <button onClick={() => setActiveTab('support')} style={{ background: activeTab === 'support' ? '#EEF2FF' : 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: activeTab === 'support' ? 700 : 500, color: activeTab === 'support' ? '#4F46E5' : 'var(--text-secondary)' }}><HelpCircle size={18} /> Support</button>
                    )}
                </div>

                {/* Content Area */}
                <div className="card" style={{ padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    {activeTab === 'profile' && (
                        <div>
                            <h2 style={{ marginBottom: '10px' }}>Personal Info</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Info about you and your preferences across LearnIQ services.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                                <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{
                                            width: '80px', height: '80px', borderRadius: '50%',
                                            backgroundColor: '#4F46E5', color: 'white',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '2rem', fontWeight: 800,
                                            overflow: 'hidden'
                                        }}>
                                            {user?.avatar ? (
                                                <img src={user.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                user?.name?.charAt(0)
                                            )}
                                        </div>
                                        <label htmlFor="avatar-upload" style={{
                                            position: 'absolute', bottom: 0, right: 0,
                                            backgroundColor: 'white', border: '1px solid #E2E8F0',
                                            borderRadius: '50%', padding: '5px', cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                        }}>
                                            <Camera size={14} color="#4F46E5" />
                                            <input
                                                type="file"
                                                id="avatar-upload"
                                                accept="image/*"
                                                onChange={handleAvatarUpload}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{user?.name}</div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Update your profile photo and personal details</div>
                                    </div>
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <SettingRow title="Display Name" description="Your name as it appears to instructors and peers." control={<input type="text" defaultValue={user?.name} onBlur={(e) => updateUser({ name: e.target.value })} style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)' }} />} />
                                    <SettingRow title="Email" description="Primary email for notifications and recovery." control={<span>{user?.email}</span>} />
                                    <SettingRow title="Location" description="Set your local time zone." control={<select style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}><option>India (GMT+5:30)</option><option>USA (PST)</option></select>} />
                                </div>

                                {/* Logout section */}
                                <div style={{ gridColumn: '1 / -1', marginTop: '30px', borderTop: '1px solid var(--border)', paddingTop: '30px' }}>
                                    <div style={{ marginBottom: '15px' }}>
                                        <div style={{ fontWeight: 700, color: '#E11D48' }}>Sign Out</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Securely log out of your LearnIQ account.</div>
                                    </div>
                                    <button
                                        onClick={logout}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '10px',
                                            backgroundColor: '#FFF1F2', color: '#E11D48',
                                            padding: '12px 24px', borderRadius: '12px', border: 'none',
                                            cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s'
                                        }}
                                        onMouseOver={(e) => e.target.style.backgroundColor = '#FFE4E6'}
                                        onMouseOut={(e) => e.target.style.backgroundColor = '#FFF1F2'}
                                    >
                                        <LogOut size={20} />
                                        Sign Out from Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                                <Shield size={28} color="#4F46E5" />
                                <h2 style={{ margin: 0 }}>Security Settings</h2>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '35px' }}>Manage your account security and authentication methods.</p>

                            <div style={{ backgroundColor: 'var(--bg-main)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '30px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                    <Lock size={20} color="var(--text-primary)" />
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Update Password</h3>
                                </div>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    const current = e.target.current.value;
                                    const newPass = e.target.newPass.value;
                                    const confirm = e.target.confirm.value;

                                    if (newPass !== confirm) {
                                        alert("New passwords do not match!");
                                        return;
                                    }
                                    if (newPass.length < 6) {
                                        alert("Password must be at least 6 characters");
                                        return;
                                    }
                                    alert("Password updated successfully!");
                                    e.target.reset();
                                }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600 }}>Current Password</label>
                                            <div style={{ position: 'relative' }}>
                                                <input name="current" type={showPassword ? "text" : "password"} placeholder="••••••••" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', paddingRight: '40px' }} required />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                                                    <Eye size={18} opacity={showPassword ? 1 : 0.5} />
                                                </button>
                                            </div>
                                        </div>
                                        <div></div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600 }}>New Password</label>
                                            <div style={{ position: 'relative' }}>
                                                <input name="newPass" type={showPassword ? "text" : "password"} placeholder="New password" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', paddingRight: '40px' }} required />
                                            </div>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600 }}>Confirm New Password</label>
                                            <div style={{ position: 'relative' }}>
                                                <input name="confirm" type={showPassword ? "text" : "password"} placeholder="Confirm new password" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', paddingRight: '40px' }} required />
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ width: 'fit-content', padding: '12px 30px' }}>Update Password</button>
                                </form>
                            </div>

                            <div style={{ marginTop: '40px', padding: '25px', backgroundColor: '#EEF2FF', borderRadius: '16px', border: '1px dashed #4F46E5' }}>
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '12px', height: 'fit-content' }}>
                                        <Smartphone size={24} color="#4F46E5" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '1rem', color: '#1E293B' }}>Secure Your Devices</div>
                                        <p style={{ margin: '5px 0 15px', fontSize: '0.85rem', color: '#64748B', lineHeight: 1.5 }}>Make sure your mobile number is up to date for account recovery and two-factor authentication.</p>
                                        <button style={{ backgroundColor: 'white', border: '1px solid #E2E8F0', padding: '10px 20px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', color: '#1E293B' }}>Update Recovery Info</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <div>
                                    <h2 style={{ marginBottom: '5px' }}>Notifications</h2>
                                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage your alerts and saved messages.</p>
                                </div>
                                <button onClick={fetchNotifications} style={{ fontSize: '0.8rem' }} className="btn">Refresh</button>
                            </div>

                            {notifLoading ? (
                                <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>Loading alerts...</div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {notifications.map((n) => (
                                        <div key={n._id} style={{
                                            padding: '20px',
                                            borderRadius: '12px',
                                            backgroundColor: n.isRead ? 'var(--bg-main)' : '#F0F9FF',
                                            border: `1px solid ${n.isRead ? 'var(--border)' : '#BAE6FD'}`,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            gap: '20px'
                                        }}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                    <span style={{
                                                        fontSize: '0.7rem',
                                                        textTransform: 'uppercase',
                                                        fontWeight: 800,
                                                        color: n.type === 'alert' ? '#DC2626' : (n.type === 'success' ? '#059669' : '#0284C7')
                                                    }}>
                                                        {n.type || 'Alert'}
                                                    </span>
                                                    {!n.isRead && <div style={{ width: '6px', height: '6px', backgroundColor: '#0284C7', borderRadius: '50%' }}></div>}
                                                    {n.isSaved && <div style={{ fontSize: '0.7rem', backgroundColor: '#FEF3C7', color: '#92400E', padding: '1px 6px', borderRadius: '4px' }}>Saved</div>}
                                                </div>
                                                <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>{n.message}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                                                    {new Date(n.createdAt).toLocaleString()}
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    onClick={() => handleUpdateNotif(n._id, { isSaved: !n.isSaved })}
                                                    style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'white', cursor: 'pointer', color: n.isSaved ? '#F59E0B' : '#64748B' }}
                                                    title={n.isSaved ? "Unsave" : "Save"}
                                                >
                                                    <Save size={16} />
                                                </button>
                                                {!n.isRead && (
                                                    <button
                                                        onClick={() => handleUpdateNotif(n._id, { isRead: true })}
                                                        style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'white', cursor: 'pointer', color: '#4F46E5' }}
                                                        title="Mark as Read"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDeleteNotif(n._id)}
                                                    style={{ padding: '8px', borderRadius: '8px', border: '1px solid #FEE2E2', backgroundColor: 'white', cursor: 'pointer', color: '#DC2626' }}
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {notifications.length === 0 && (
                                        <div style={{ padding: '60px', textAlign: 'center', backgroundColor: 'var(--bg-main)', borderRadius: '15px', color: '#64748B' }}>
                                            <Bell size={40} style={{ marginBottom: '15px', opacity: 0.3 }} />
                                            <div>No notifications found.</div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div style={{ marginTop: '40px', borderTop: '1px solid var(--border)', paddingTop: '30px' }}>
                                <h4 style={{ marginBottom: '20px' }}>Delivery Preferences</h4>
                                <SettingRow title="Email Notifications" description="Receive course updates and performance reports via email." control={<input type="checkbox" defaultChecked />} />
                                <SettingRow title="Push Notifications" description="Get instant alerts for new lectures and assignments." control={<input type="checkbox" defaultChecked />} />
                                <SettingRow title="SMS Alerts" description="Important deadlines via text message." control={<input type="checkbox" />} />
                            </div>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                                <Palette size={28} color="#4F46E5" />
                                <h2 style={{ margin: 0 }}>Design & Appearance</h2>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '35px' }}>Customize your learning environment to stay focused and productive.</p>

                            <div style={{ marginBottom: '40px' }}>
                                <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text-primary)' }}>Choose Theme</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        onClick={() => updateUser({ theme: 'light' })}
                                        style={{
                                            padding: '24px',
                                            border: user?.theme === 'light' ? '3px solid #4F46E5' : '1px solid var(--border)',
                                            borderRadius: '16px', cursor: 'pointer',
                                            backgroundColor: 'white',
                                            color: '#1E293B',
                                            boxShadow: user?.theme === 'light' ? '0 10px 25px rgba(79, 70, 229, 0.15)' : 'none',
                                            transition: 'all 0.3s ease'
                                        }}>
                                        <div style={{ height: '80px', backgroundColor: '#F8FAFC', borderRadius: '12px', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E2E8F0' }}>
                                            <div style={{ width: '60%', height: '10px', backgroundColor: '#E2E8F0', borderRadius: '5px' }}></div>
                                        </div>
                                        <div style={{ fontWeight: 700, textAlign: 'center' }}>Light Mode</div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748B', textAlign: 'center', marginTop: '5px' }}>Default bright workspace</div>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        onClick={() => updateUser({ theme: 'dark' })}
                                        style={{
                                            padding: '24px',
                                            border: user?.theme === 'dark' ? '3px solid #4F46E5' : '1px solid #1E293B',
                                            borderRadius: '16px', cursor: 'pointer',
                                            backgroundColor: '#1E293B', color: 'white',
                                            boxShadow: user?.theme === 'dark' ? '0 10px 25px rgba(79, 70, 229, 0.3)' : 'none',
                                            transition: 'all 0.3s ease'
                                        }}>
                                        <div style={{ height: '80px', backgroundColor: '#334155', borderRadius: '12px', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #475569' }}>
                                            <div style={{ width: '60%', height: '10px', backgroundColor: '#475569', borderRadius: '5px' }}></div>
                                        </div>
                                        <div style={{ fontWeight: 700, textAlign: 'center' }}>Dark Mode</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94A3B8', textAlign: 'center', marginTop: '5px' }}>Easier on the eyes at night</div>
                                    </motion.div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', borderTop: '1px solid var(--border)', paddingTop: '30px' }}>
                                <div>
                                    <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text-primary)' }}>Font Size Selection</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'var(--bg-main)', padding: '10px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                                        {['small', 'medium', 'large'].map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => updateUser({ fontSize: size })}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: '15px',
                                                    padding: '12px 20px', borderRadius: '12px', border: 'none',
                                                    background: user?.fontSize === size ? 'var(--bg-card)' : 'transparent',
                                                    boxShadow: user?.fontSize === size ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                                                    color: user?.fontSize === size ? '#4F46E5' : 'var(--text-secondary)',
                                                    fontWeight: user?.fontSize === size ? 700 : 500,
                                                    cursor: 'pointer', transition: 'all 0.2s',
                                                    textAlign: 'left'
                                                }}
                                            >
                                                <div style={{
                                                    fontSize: size === 'small' ? '0.8rem' : size === 'medium' ? '1rem' : '1.2rem',
                                                    width: '24px', textAlign: 'center'
                                                }}>A</div>
                                                <span style={{ textTransform: 'capitalize' }}>{size} Text</span>
                                                {user?.fontSize === size && <div style={{ marginLeft: 'auto', width: '8px', height: '8px', backgroundColor: '#4F46E5', borderRadius: '50%' }}></div>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'support' && (
                        <div>
                            <h2 style={{ marginBottom: '10px' }}>Support & FAQ</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Find answers to common questions or contact our team.</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <details style={{ padding: '15px', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>
                                    <summary style={{ fontWeight: 700 }}>How do I earn a certificate?</summary>
                                    <p style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>To earn a certificate, you must complete all lectures in a course and pass the final assessment with a score of 70% or higher.</p>
                                </details>
                                <details style={{ padding: '15px', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>
                                    <summary style={{ fontWeight: 700 }}>Can I download lectures for offline use?</summary>
                                    <p style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Currently, video lectures are available for online streaming only. However, you can download course transcripts and notes.</p>
                                </details>
                            </div>

                            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                                <p>Still need help?</p>
                                <button onClick={() => navigate('/contact')} className="btn btn-primary" style={{ marginTop: '10px' }}>Contact Support Team</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
