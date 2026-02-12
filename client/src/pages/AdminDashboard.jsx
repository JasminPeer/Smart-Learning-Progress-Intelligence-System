import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { courses as staticCourses } from '../data/curriculum';
import {
    Users,
    BookOpen,
    Shield,
    TrendingUp,
    Settings,
    UserCheck,
    AlertCircle,
    Download,
    Cpu,
    Database,
    Globe,
    Activity,
    X,
    Trash2
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { motion } from 'framer-motion';

const AdminDashboard = ({ activeSection }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(activeSection || 'overview');

    useEffect(() => {
        if (activeSection) {
            setActiveTab(activeSection);
        }
    }, [activeSection]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    // Initial load on mount
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [stats, setStats] = useState({
        totalUsers: 0,
        students: 0,
        instructors: 0,
        activeCourses: 0,
        uptime: '99.9%'
    });
    const [users, setUsers] = useState([]);
    const [adminCourses, setAdminCourses] = useState([]);
    const [allProgress, setAllProgress] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCourse, setNewCourse] = useState({ title: '', category: '', description: '', duration: '' });

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/admin/courses', newCourse, { headers: { Authorization: `Bearer ${token}` } });
            setAdminCourses([...adminCourses, res.data]);
            setIsModalOpen(false);
            setNewCourse({ title: '', category: '', description: '', duration: '' });
            alert("Course added successfully!");
        } catch (err) {
            console.error("Error adding course:", err);
            // Fallback for demo if API doesn't exist yet
            setAdminCourses([...adminCourses, { ...newCourse, _id: Date.now().toString(), topics: [] }]);
            setIsModalOpen(false);
            alert("Course added to local state (Demo Mode)!");
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            // Always load courses to ensure they're ready
            const staticMapped = staticCourses.map(sc => ({ ...sc, _id: sc.id, isStatic: true, level: 'Standard' }));
            try {
                const coursesRes = await axios.get('/api/admin/courses', config);
                const dbCourses = coursesRes.data || [];
                const dbTitles = new Set(dbCourses.map(c => c.title));
                const merged = [...dbCourses];
                staticMapped.forEach(sc => {
                    if (!dbTitles.has(sc.title)) merged.push(sc);
                });
                setAdminCourses(merged);
            } catch (e) {
                console.warn("API courses fetch failed, using static only:", e);
                setAdminCourses(staticMapped);
            }

            if (activeTab === 'overview') {
                try {
                    const statsRes = await axios.get('/api/admin/stats', config);
                    setStats(statsRes.data);
                } catch (e) {
                    console.warn("Stats API failed, using mock data");
                    setStats({
                        totalUsers: 1250,
                        students: 1100,
                        admins: 15,
                        activeCourses: 24,
                        uptime: '99.98%'
                    });
                }
            } else if (activeTab === 'users') {
                try {
                    const usersRes = await axios.get('/api/admin/users', config);
                    setUsers(usersRes.data);
                } catch (e) {
                    setUsers([
                        { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'student', status: 'Active', lastLogin: '2 hours ago' },
                        { _id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'student', status: 'Active', lastLogin: '1 day ago' },
                        { _id: '3', name: 'Admin User', email: 'admin@learniq.com', role: 'admin', status: 'Active', lastLogin: 'Just now' }
                    ]);
                }
            } else if (activeTab === 'progress') {
                try {
                    const progressRes = await axios.get('/api/admin/progress', config);
                    setAllProgress(progressRes.data);
                } catch (e) {
                    setAllProgress([]);
                }
            }
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/admin/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            setUsers(users.filter(u => u._id !== id));
        } catch (err) {
            alert("Error deleting user");
        }
    };

    const handleDeleteCourse = async (id) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/admin/courses/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            setAdminCourses(adminCourses.filter(c => c._id !== id));
        } catch (err) {
            alert("Error deleting course");
        }
    };

    const handleExportData = () => {
        const dataToExport = activeTab === 'users' ? users : (activeTab === 'courses' ? adminCourses : allProgress);
        if (dataToExport.length === 0) {
            alert("No data available to export for this tab.");
            return;
        }

        const headers = Object.keys(dataToExport[0]).filter(k => k !== '__v' && k !== '_id').join(',');
        const rows = dataToExport.map(obj =>
            Object.keys(obj)
                .filter(k => k !== '__v' && k !== '_id')
                .map(k => typeof obj[k] === 'object' ? JSON.stringify(obj[k]).replace(/,/g, ';') : String(obj[k]).replace(/,/g, ';'))
                .join(',')
        );

        const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows.join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `learniq_${activeTab}_data.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Analytics Data
    const platformGrowth = [
        { month: 'Sep', users: 800, reach: 5000 },
        { month: 'Oct', users: 950, reach: 5800 },
        { month: 'Nov', users: 1100, reach: 7200 },
        { month: 'Dec', users: 1200, reach: 8500 },
        { month: 'Jan', users: stats.totalUsers || 1250, reach: 9800 }
    ];

    const enrollmentTrend = [
        { month: 'Aug', enrollments: 450 },
        { month: 'Sep', enrollments: 520 },
        { month: 'Oct', enrollments: 610 },
        { month: 'Nov', enrollments: 740 },
        { month: 'Dec', enrollments: 890 },
        { month: 'Jan', enrollments: stats.students || 950 }
    ];

    const userDistribution = [
        { name: 'Students', value: stats.students || 1, color: '#10B981' },
        { name: 'Admins', value: stats.admins || 1, color: '#8B5CF6' }
    ];

    return (
        <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 20px' }}>
            {/* Admin Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    marginBottom: '40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderLeft: '4px solid var(--primary)',
                    paddingLeft: '20px'
                }}
            >
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1E293B', marginBottom: '5px' }}>
                        Platform Administration
                    </h1>
                    <p style={{ color: '#64748B', fontSize: '1rem' }}>
                        {activeTab === 'overview' && "System-wide metrics and performance tracking"}
                        {activeTab === 'users' && "Manage student accounts and credentials"}
                        {activeTab === 'courses' && "Manage educational curriculum and tracks"}
                        {activeTab === 'progress' && "Monitor global student engagement and completion"}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button onClick={() => { setActiveTab('system'); navigate('/dashboard/admin/system'); }} className="btn" style={{ backgroundColor: '#F1F5F9', color: '#475569', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Settings size={18} /> Settings
                    </button>
                    <button onClick={handleExportData} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Download size={18} /> Export Data
                    </button>
                </div>
            </motion.div>

            {/* Tab Navigation */}
            <div style={{ display: 'flex', gap: '5px', marginBottom: '30px', backgroundColor: '#F1F5F9', padding: '5px', borderRadius: '12px', width: 'fit-content' }}>
                {['Overview', 'Users', 'Courses', 'Progress', 'System', 'AI'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => {
                            const section = tab.toLowerCase();
                            setActiveTab(section);
                            navigate(`/dashboard/admin/${section === 'overview' ? '' : section}`);
                        }}
                        style={{
                            padding: '10px 25px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: activeTab === tab.toLowerCase() ? 'white' : 'transparent',
                            color: activeTab === tab.toLowerCase() ? 'var(--primary)' : '#64748B',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: activeTab === tab.toLowerCase() ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none',
                            transition: 'all 0.2s'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {loading ? (
                <div style={{ padding: '100px', textAlign: 'center', color: 'var(--primary)', fontWeight: 600 }}>Loading board...</div>
            ) : (
                <>
                    {activeTab === 'overview' && (
                        <>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '40px' }}>
                                <AdminStatCard icon={<Users />} title="Total Users" value={stats.totalUsers} trend="+12%" color="#4F46E5" />
                                <AdminStatCard icon={<BookOpen />} title="Active Courses" value={stats.activeCourses} trend="+2" color="#10B981" />
                                <AdminStatCard icon={<TrendingUp />} title="Students" value={stats.students} trend="75%" color="#F59E0B" />
                                <AdminStatCard icon={<Activity />} title="System Health" value={stats.uptime} trend="Stable" color="#3B82F6" />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '30px', marginBottom: '40px' }}>
                                <div className="card" style={{ padding: '30px' }}>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <TrendingUp size={24} /> Growth Analytics
                                    </h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <AreaChart data={platformGrowth}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="users" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.1} name="New Users" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="card" style={{ padding: '30px' }}>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Users size={24} /> Role Distribution
                                    </h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie data={userDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                                                {userDistribution.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'ai' && (
                        <div className="card" style={{ padding: '30px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                                <div>
                                    <h2 style={{ margin: 0 }}>AI Management</h2>
                                    <p style={{ color: '#64748B', margin: '5px 0 0' }}>Control EduGuide AI settings and monitor engagement</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <span style={{ fontWeight: 600, color: '#059669' }}>Status: Operational</span>
                                    <div style={{ width: '40px', height: '20px', backgroundColor: '#059669', borderRadius: '20px', position: 'relative', cursor: 'pointer' }}>
                                        <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid-cols-2" style={{ gap: '30px' }}>
                                <div style={{ padding: '20px', border: '1px solid #E2E8F0', borderRadius: '15px' }}>
                                    <h4 style={{ marginBottom: '15px' }}>Response Configuration</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span>Max Response Length</span>
                                            <select style={{ padding: '5px 10px', borderRadius: '5px' }}>
                                                <option>Short (50 words)</option>
                                                <option selected>Medium (150 words)</option>
                                                <option>Detailed (300 words)</option>
                                            </select>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span>Teacher-like Tone</span>
                                            <input type="checkbox" checked />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span>Knowledge Retraining</span>
                                            <button className="btn" style={{ padding: '4px 10px', fontSize: '0.7rem' }}>Update Index</button>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ padding: '20px', border: '1px solid #E2E8F0', borderRadius: '15px' }}>
                                    <h4 style={{ marginBottom: '15px' }}>Top Subject Doubts</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {[
                                            { q: "Linear Algebra Proving", count: 156 },
                                            { q: "Atomic Structure (Bohr's)", count: 98 },
                                            { q: "Double Entry Rules", count: 82 },
                                            { q: "Operating System Kernels", count: 45 }
                                        ].map((item, i) => (
                                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', paddingBottom: '8px', borderBottom: '1px solid #F1F5F9' }}>
                                                <span style={{ color: '#334155' }}>{item.q}</span>
                                                <span style={{ fontWeight: 700, color: '#059669' }}>{item.count} threads</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '15px', border: '1px solid #E2E8F0' }}>
                                <h4 style={{ marginBottom: '15px' }}>AI Hallucination Monitoring</h4>
                                <div style={{ height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', marginBottom: '10px' }}>
                                    <div style={{ width: '2%', height: '100%', backgroundColor: '#059669', borderRadius: '4px' }}></div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748B' }}>
                                    <span>Error Rate: 0.12%</span>
                                    <span>Critical Issues: 0</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', border: '1px solid #E2E8F0' }}>
                                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="text"
                                            placeholder="Search users..."
                                            style={{ padding: '10px 15px 10px 40px', borderRadius: '8px', border: '1px solid #CBD5E1', width: '300px' }}
                                        />
                                        <Users size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748B' }} />
                                    </div>
                                    <select style={{ padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: 'white' }}>
                                        <option>All Roles</option>
                                        <option>Students</option>
                                        <option>Admins</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button className="btn" style={{ fontSize: '0.85rem' }}>Download CSV</button>
                                    <button className="btn btn-primary" style={{ fontSize: '0.85rem' }}>+ Create User</button>
                                </div>
                            </div>

                            <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                                        <tr>
                                            <th style={{ padding: '15px 20px', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase' }}>User</th>
                                            <th style={{ padding: '15px 20px', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase' }}>Role</th>
                                            <th style={{ padding: '15px 20px', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase' }}>Status</th>
                                            <th style={{ padding: '15px 20px', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase' }}>Last Login</th>
                                            <th style={{ padding: '15px 20px', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(u => (
                                            <tr key={u._id} style={{ borderBottom: '1px solid #F1F5F9' }} className="hover-row">
                                                <td style={{ padding: '15px 20px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#475569' }}>
                                                            {u.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div style={{ fontWeight: 600, color: '#1E293B' }}>{u.name}</div>
                                                            <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{u.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '15px 20px' }}>
                                                    <span style={{ fontSize: '0.85rem', color: '#475569' }}>{u.role}</span>
                                                </td>
                                                <td style={{ padding: '15px 20px' }}>
                                                    <span style={{
                                                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                        padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600,
                                                        backgroundColor: '#DCFCE7', color: '#166534'
                                                    }}>
                                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22C55E' }}></div>
                                                        {u.status || 'Active'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '15px 20px', color: '#64748B', fontSize: '0.85rem' }}>{u.lastLogin || 'N/A'}</td>
                                                <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                                                    <button onClick={() => handleDeleteUser(u._id)} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: '#FEE2E2', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Trash2 size={16} color="#DC2626" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'courses' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', border: '1px solid #E2E8F0' }}>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="text"
                                            placeholder="Search curriculum..."
                                            style={{ padding: '10px 15px 10px 40px', borderRadius: '8px', border: '1px solid #CBD5E1', width: '280px' }}
                                        />
                                        <BookOpen size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748B' }} />
                                    </div>
                                    <select style={{ padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: 'white' }}>
                                        <option>All Categories</option>
                                        <option>NEET/JEE</option>
                                        <option>K-12</option>
                                        <option>Higher Ed</option>
                                    </select>
                                </div>
                                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} style={{ fontSize: '0.85rem' }}>+ New System Course</button>
                            </div>

                            <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                                        <tr>
                                            <th style={{ padding: '15px 20px', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase' }}>Course Identity</th>
                                            <th style={{ padding: '15px 20px', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase' }}>Category/Level</th>
                                            <th style={{ padding: '15px 20px', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase' }}>Structure</th>
                                            <th style={{ padding: '15px 20px', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', textAlign: 'right' }}>Management</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {adminCourses.map(c => (
                                            <tr key={c._id} style={{ borderBottom: '1px solid #F1F5F9' }} className="hover-row">
                                                <td style={{ padding: '15px 20px' }}>
                                                    <div style={{ fontWeight: 700, color: '#1E293B' }}>{c.title}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'monospace' }}>ID: {c._id.substring(0, 8)}</div>
                                                </td>
                                                <td style={{ padding: '15px 20px' }}>
                                                    <div style={{ fontSize: '0.9rem', color: '#475569' }}>{c.category}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{c.level || 'Standard'}</div>
                                                </td>
                                                <td style={{ padding: '15px 20px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E293B' }}>{c.topics?.length || 0} Lessons</span>
                                                        <span style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: '#F1F5F9', fontSize: '0.7rem', color: '#64748B' }}>Verified</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                                        <button style={{ padding: '6px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: 'white', cursor: 'pointer', color: '#1E40AF' }}>
                                                            <Settings size={14} />
                                                        </button>
                                                        <button onClick={() => handleDeleteCourse(c._id)} style={{ padding: '6px', borderRadius: '6px', border: '1px solid #FEE2E2', backgroundColor: 'white', cursor: 'pointer', color: '#B91C1C' }}>
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {adminCourses.length === 0 && (
                                            <tr>
                                                <td colSpan="4" style={{ padding: '60px', textAlign: 'center' }}>
                                                    <Bot size={40} color="#CBD5E1" style={{ marginBottom: '15px' }} />
                                                    <div style={{ color: '#64748B', fontWeight: 600 }}>No curriculum data available in database.</div>
                                                    <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Initialize the system or add your first course to begin.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'progress' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <div className="card" style={{ padding: '30px' }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <TrendingUp size={24} /> 6-Month Student Enrollment & Reach
                                </h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={enrollmentTrend}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="enrollments" stroke="var(--primary)" strokeWidth={3} dot={{ r: 6 }} name="New Enrollments" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                                <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Active Student Engagement</h3>
                                    <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Total Records: {allProgress.length}</span>
                                </div>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                                        <tr>
                                            <th style={{ padding: '20px', textAlign: 'left', color: '#64748B' }}>Student</th>
                                            <th style={{ padding: '20px', textAlign: 'left', color: '#64748B' }}>Course</th>
                                            <th style={{ padding: '20px', textAlign: 'left', color: '#64748B' }}>Progress</th>
                                            <th style={{ padding: '20px', textAlign: 'left', color: '#64748B' }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allProgress.map((p, idx) => (
                                            <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                                <td style={{ padding: '20px', fontWeight: 600 }}>{p.userId?.name || 'Unknown'}</td>
                                                <td style={{ padding: '20px', color: '#64748B' }}>{p.courseId?.title || 'Unknown'}</td>
                                                <td style={{ padding: '20px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <div style={{ flex: 1, height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', minWidth: '100px' }}>
                                                            <div style={{ width: `${p.progress}%`, height: '100%', backgroundColor: 'var(--primary)', borderRadius: '3px' }}></div>
                                                        </div>
                                                        <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{p.progress}%</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '20px' }}>
                                                    <span style={{ color: p.completed ? '#10B981' : '#F59E0B', fontWeight: 700, fontSize: '0.85rem' }}>
                                                        {p.completed ? 'COMPLETED' : 'IN PROGRESS'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {allProgress.length === 0 && <tr><td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#94A3B8' }}>No activity records found.</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'system' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            {/* Server Health Overview */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                                <div className="card" style={{ padding: '20px', border: '1px solid #E2E8F0' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                        <div style={{ color: '#166534', fontWeight: 700, fontSize: '0.9rem' }}>CPU Usage</div>
                                        <Cpu size={18} color="#166534" />
                                    </div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1E293B', marginBottom: '10px' }}>24.8%</div>
                                    <ResponsiveContainer width="100%" height={50}>
                                        <AreaChart data={[{ v: 20 }, { v: 25 }, { v: 22 }, { v: 30 }, { v: 24 }]}>
                                            <Area type="monotone" dataKey="v" stroke="#22C55E" fill="#DCFCE7" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="card" style={{ padding: '20px', border: '1px solid #E2E8F0' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                        <div style={{ color: '#1E40AF', fontWeight: 700, fontSize: '0.9rem' }}>Memory (RAM)</div>
                                        <Database size={18} color="#1E40AF" />
                                    </div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1E293B', marginBottom: '10px' }}>4.2 GB <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 500 }}>/ 8GB</span></div>
                                    <div style={{ height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ width: '52%', height: '100%', backgroundColor: '#3B82F6' }}></div>
                                    </div>
                                </div>
                                <div className="card" style={{ padding: '20px', border: '1px solid #E2E8F0' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                        <div style={{ color: '#B45309', fontWeight: 700, fontSize: '0.9rem' }}>Storage</div>
                                        <Database size={18} color="#B45309" />
                                    </div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1E293B', marginBottom: '10px' }}>128 GB <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 500 }}>/ 512GB</span></div>
                                    <div style={{ height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ width: '25%', height: '100%', backgroundColor: '#F59E0B' }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                                <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Service Infrastructure Status</h3>
                                    <button className="btn" style={{ padding: '5px 15px', fontSize: '0.8rem' }}>Refresh Status</button>
                                </div>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                                        <tr>
                                            <th style={{ padding: '15px 20px', textAlign: 'left', color: '#64748B', fontSize: '0.8rem', textTransform: 'uppercase' }}>Service</th>
                                            <th style={{ padding: '15px 20px', textAlign: 'left', color: '#64748B', fontSize: '0.8rem', textTransform: 'uppercase' }}>Region</th>
                                            <th style={{ padding: '15px 20px', textAlign: 'left', color: '#64748B', fontSize: '0.8rem', textTransform: 'uppercase' }}>Uptime</th>
                                            <th style={{ padding: '15px 20px', textAlign: 'left', color: '#64748B', fontSize: '0.8rem', textTransform: 'uppercase' }}>Latency</th>
                                            <th style={{ padding: '15px 20px', textAlign: 'left', color: '#64748B', fontSize: '0.8rem', textTransform: 'uppercase' }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <StatusRow service="Main API Gateway" region="IN-WEST-1" uptime="99.99%" load="42ms" status="Operational" />
                                        <StatusRow service="Authentication Service" region="IN-WEST-1" uptime="100%" load="12ms" status="Operational" />
                                        <StatusRow service="Content Delivery (CDN)" region="Global Edge" uptime="99.95%" load="5ms" status="Operational" />
                                        <StatusRow service="MongoDB Database" region="Singapore-1" uptime="99.98%" load="120ms" status="Slight Latency" />
                                        <StatusRow service="Chatbot AI Instance" region="US-EAST-1" uptime="99.90%" load="250ms" status="Operational" />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}

            {isModalOpen && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }}>
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card" style={{ width: '500px', padding: '40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <h2 style={{ margin: 0 }}>Add New System Course</h2>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleAddCourse} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="form-group">
                                <label>Course Title</label>
                                <input type="text" required value={newCourse.title} onChange={e => setNewCourse({ ...newCourse, title: e.target.value })} placeholder="e.g., Quantum Physics Masterclass" />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    value={newCourse.category}
                                    onChange={e => setNewCourse({ ...newCourse, category: e.target.value })}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Class 6-10">Class 6-10</option>
                                    <option value="Class 11-12">Class 11-12</option>
                                    <option value="NEET">NEET</option>
                                    <option value="JEE">JEE</option>
                                    <option value="UG Courses">UG Courses</option>
                                    <option value="PG Courses">PG Courses</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Duration (Weeks)</label>
                                <input type="text" value={newCourse.duration} onChange={e => setNewCourse({ ...newCourse, duration: e.target.value })} placeholder="e.g., 40 Weeks" />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea value={newCourse.description} onChange={e => setNewCourse({ ...newCourse, description: e.target.value })} placeholder="Briefly describe the course..." />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px', marginTop: '10px' }}>Save System Course</button>
                        </form>
                    </motion.div>
                </div>
            )}

        </div>
    );
};

const AdminStatCard = ({ icon, title, value, trend, color }) => (
    <div className="card" style={{ padding: '25px', borderTop: `4px solid ${color}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <div style={{ color: color }}>{icon}</div>
            <span style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 700 }}>{trend}</span>
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1E293B', marginBottom: '5px' }}>{value}</h2>
        <div style={{ color: '#64748B', fontSize: '0.9rem', fontWeight: 600 }}>{title}</div>
    </div>
);

const QuickAction = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
            padding: '20px', backgroundColor: 'white', border: '1px solid #E2E8F0',
            borderRadius: '15px', cursor: 'pointer', transition: 'all 0.2s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
    >
        <div style={{ color: '#4F46E5' }}>{icon}</div>
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1E293B' }}>{label}</span>
    </button>
);

const StatusRow = ({ service, region, uptime, load, status }) => (
    <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
        <td style={{ padding: '15px', fontWeight: 600, color: '#1E293B' }}>{service}</td>
        <td style={{ padding: '15px', color: '#64748B', fontSize: '0.9rem' }}>{region}</td>
        <td style={{ padding: '15px', color: '#64748B', fontSize: '0.9rem' }}>{uptime}</td>
        <td style={{ padding: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ flex: 1, height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px' }}>
                    <div style={{ width: load, height: '100%', backgroundColor: '#4F46E5', borderRadius: '3px' }}></div>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>{load}</span>
            </div>
        </td>
        <td style={{ padding: '15px' }}>
            <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, backgroundColor: '#ECFDF5', color: '#10B981' }}>
                {status}
            </span>
        </td>
    </tr>
);

export default AdminDashboard;
