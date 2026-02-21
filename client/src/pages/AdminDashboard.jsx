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
    Trash2,
    Eye,
    Plus,
    FileText,
    Award,
    Bell,
    Bot,
    Search,
    Save
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
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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
        admins: 0,
        activeCourses: 0,
        uptime: '99.9%'
    });
    const [users, setUsers] = useState([]);
    const [adminCourses, setAdminCourses] = useState([]);
    const [allProgress, setAllProgress] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userStats, setUserStats] = useState(null);
    const [newUserForm, setNewUserForm] = useState({ name: '', email: '', password: '', role: 'student', category: '', mobileNumber: '' });
    const [newCourse, setNewCourse] = useState({
        title: '',
        category: '',
        description: '',
        detailedDescription: '',
        theory: '',
        duration: '',
        introVideoUrl: '',
        image: '',
        rating: 4.5,
        resources: [{ title: '', url: '' }],
        topics: [],
        assessment: { title: '', questions: [] }
    });
    const [isEditCourseModalOpen, setIsEditCourseModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [courseSearchTerm, setCourseSearchTerm] = useState('');
    const [courseCategory, setCourseCategory] = useState('All Categories');
    const [engagementStats, setEngagementStats] = useState({ topStudents: [], bottomStudents: [] });
    const [userSearchTerm, setUserSearchTerm] = useState('');
    const [userRoleFilter, setUserRoleFilter] = useState('All Roles');
    const [aiConfig, setAiConfig] = useState({
        name: 'Luna-AI',
        behaviour: 'Clever, wise, and slightly playful anime cat companion. Act as a guide who provides insightful hints while maintaining a mysterious yet helpful demeanor.',
        condition: 'Purring with intelligence (Operational)',
        wayOfSpeech: 'Uses subtle cat-themed puns and polite nyan-terminators. "Greetings, Nyan! Ready to sharpen your claws on some new knowledge today?"',
        requiredDetails: 'Focus on curriculum mastery, student encouragement, and logical reasoning. Act as a superior yet supportive feline mentor.',
        apiVersion: 'v1beta'
    });

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/admin/courses', newCourse, { headers: { Authorization: `Bearer ${token}` } });
            setAdminCourses([...adminCourses, res.data]);
            setIsModalOpen(false);
            setNewCourse({
                title: '',
                category: '',
                description: '',
                detailedDescription: '',
                theory: '',
                duration: '',
                introVideoUrl: '',
                image: '',
                rating: 4.5,
                resources: [{ title: '', url: '' }],
                topics: [],
                assessment: { title: '', questions: [] }
            });
            alert("Course added successfully!");
        } catch (err) {
            console.error("Error adding course:", err);
            alert("Failed to add course: " + (err.response?.data?.message || err.message));
        }
    };

    const handleEditCourse = (course) => {
        setEditingCourse(course);
        setIsEditCourseModalOpen(true);
    };

    const handleUpdateCourse = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`/api/admin/courses/${editingCourse._id}`, editingCourse, { headers: { Authorization: `Bearer ${token}` } });
            setAdminCourses(adminCourses.map(c => c._id === res.data._id ? res.data : c));
            setIsEditCourseModalOpen(false);
            setEditingCourse(null);
            alert("Course updated successfully!");
        } catch (err) {
            console.error("Error updating course:", err);
            alert("Failed to update course: " + (err.response?.data?.message || err.message));
        }
    };

    const handleSaveAIConfig = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/admin/ai-config', aiConfig, { headers: { Authorization: `Bearer ${token}` } });
            setAiConfig(res.data);
            alert("AI Configuration saved successfully!");
        } catch (err) {
            console.error("Error saving AI config:", err);
            alert("Failed to save AI configuration: " + (err.response?.data?.message || err.message));
        }
    };

    const handleSendNotification = async (studentId, studentName) => {
        const message = prompt(`Send a notification to ${studentName}:`);
        if (!message) return;
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/admin/notifications', {
                recipientId: studentId,
                message,
                type: 'alert'
            }, { headers: { Authorization: `Bearer ${token}` } });
            alert('Notification sent successfully!');
        } catch (err) {
            console.error('Error sending notification:', err);
            alert('Failed to send notification');
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
                    // Set engagement stats from stats
                    setEngagementStats(prev => ({
                        ...prev,
                        topStudents: statsRes.data.topStudents || [],
                        bottomStudents: statsRes.data.bottomStudents || []
                    }));
                } catch (e) {
                    console.warn("Stats API failed, using mock data");
                    setStats({
                        totalUsers: 1250,
                        students: 1235,
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
                    setUsers([]);
                }
            } else if (activeTab === 'progress') {
                try {
                    const progressRes = await axios.get('/api/admin/progress', config);
                    setAllProgress(progressRes.data);
                } catch (e) {
                    setAllProgress([]);
                }
                // Fetch engagement stats for Top 5 display
                try {
                    const engagementRes = await axios.get('/api/admin/engagement', config);
                    setEngagementStats(prev => ({ ...prev, topStudents: engagementRes.data.topStudents || [] }));
                } catch (e) {
                    console.warn('Failed to fetch engagement stats:', e);
                }
            } else if (activeTab === 'ai') {
                try {
                    const aiRes = await axios.get(`/api/admin/ai-config?cb=${Date.now()}`, config);
                    setAiConfig(aiRes.data);
                } catch (e) {
                    console.warn("AI Config fetch failed");
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
        const doc = new jsPDF();
        const timestamp = new Date().toLocaleString();

        // --- Page 1: Header & System Overview ---
        doc.setFontSize(22);
        doc.setTextColor(30, 41, 59); // Slate-800
        doc.text("LearnIQ Platform Report", 14, 22);

        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139); // Slate-500
        doc.text(`Generated on: ${timestamp}`, 14, 30);

        // System Summary Box
        doc.setDrawColor(226, 232, 240);
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(14, 40, 182, 45, 3, 3, 'FD');

        doc.setFontSize(14);
        doc.setTextColor(30, 41, 59);
        doc.text("System Overview", 20, 50);

        doc.setFontSize(11);
        doc.text(`Total Registered Users: ${stats.totalUsers}`, 20, 60);
        doc.text(`Active Students: ${stats.students}`, 20, 68);
        doc.text(`Administrators: ${stats.admins}`, 20, 76);
        doc.text(`Published Courses: ${stats.activeCourses}`, 110, 60);
        doc.text(`System Uptime: ${stats.uptime}`, 110, 68);
        doc.text(`Health Status: Operational`, 110, 76);

        // --- SECTION: USER DIRECTORY ---
        doc.setFontSize(16);
        doc.text("1. User Management Directory", 14, 105);

        const userRows = users.map(u => [
            u.name,
            u.email,
            u.role.toUpperCase(),
            u.status || 'Active',
            u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'Never'
        ]);

        autoTable(doc, {
            startY: 110,
            head: [['Name', 'Email', 'Role', 'Status', 'Last Login']],
            body: userRows,
            theme: 'striped',
            headStyles: { fillColor: [79, 70, 229] }, // Indigo-600
        });

        // --- Page 2: Course Catalog ---
        doc.addPage();
        doc.setFontSize(16);
        doc.text("2. Educational Course Catalog", 14, 20);

        const courseRows = adminCourses.map(c => [
            c.title,
            c.category,
            c.level || 'Standard',
            c.duration,
            c.topics?.length || 0,
            `${c.rating || 4.5}/5`
        ]);

        autoTable(doc, {
            startY: 25,
            head: [['Course Title', 'Category', 'Level', 'Duration', 'Lessons', 'Rating']],
            body: courseRows,
            theme: 'grid',
            headStyles: { fillColor: [16, 185, 129] }, // Emerald-500
        });

        // --- Page 3: Student Progress ---
        doc.addPage();
        doc.setFontSize(16);
        doc.text("3. Student Engagement & Progress", 14, 20);

        const progressRows = allProgress.map(p => [
            p.userId?.name || 'Unknown',
            p.userId?.email || 'N/A',
            p.courseId?.title || 'Unknown',
            `${p.progress}%`,
            p.completed ? 'COMPLETED' : 'IN PROGRESS'
        ]);

        autoTable(doc, {
            startY: 25,
            head: [['Student Name', 'Email', 'Course Enrolled', 'Progress', 'Status']],
            body: progressRows,
            theme: 'striped',
            headStyles: { fillColor: [245, 158, 11] }, // Amber-500
        });

        // Footer on all pages
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text(`LearnIQ Confidential - Page ${i} of ${pageCount}`, 14, 285);
        }

        doc.save(`LearnIQ_Full_Report_${new Date().getTime()}.pdf`);
    };

    const handleExportIndividualCSV = (u, stats) => {
        const headers = ["Name", "Email", "Role", "Courses Enrolled", "Certificates Earned", "Average Progress", "Category"];
        const values = [
            u.name,
            u.email,
            u.role,
            stats.enrolledCount,
            stats.certificatesCount,
            `${stats.avgProgress}%`,
            stats.category
        ];

        const csvContent = "data:text/csv;charset=utf-8," + headers.join(',') + "\n" + values.join(',');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${u.name.replace(/\s+/g, '_')}_progress_report.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/admin/users', newUserForm, { headers: { Authorization: `Bearer ${token}` } });
            setUsers([res.data, ...users]);
            setIsUserModalOpen(false);
            setNewUserForm({ name: '', email: '', password: '', role: 'student', category: '', mobileNumber: '' });
            alert("User created successfully!");
        } catch (err) {
            console.error("Error creating user:", err);
            alert("Error creating user: " + (err.response?.data?.message || err.message));
        }
    };

    const fetchUserStats = async (user) => {
        setSelectedUser(user);
        setIsStatsModalOpen(true);
        setUserStats(null);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`/api/admin/users/${user._id}/stats`, { headers: { Authorization: `Bearer ${token}` } });
            setUserStats(res.data);
        } catch (err) {
            console.error("Error fetching user stats:", err);
            // Mock for demo
            setUserStats({
                enrolledCount: 3,
                certificatesCount: 1,
                avgProgress: 65,
                category: 'Medium',
                courses: [
                    { title: 'Intro to AI', progress: 100, score: 85 },
                    { title: 'Web Dev', progress: 45, score: 70 },
                    { title: 'Data Science', progress: 50, score: 0 }
                ]
            });
        }
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
                    <button onClick={() => navigate('/settings')} className="btn" style={{ backgroundColor: '#F1F5F9', color: '#475569', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                            navigate(`/admin/${section === 'overview' ? '' : section}`);
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
                                        <Award size={24} /> Top Performers (Top 5)
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {engagementStats.topStudents.map((s, i) => (
                                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', backgroundColor: '#F0FDF4', borderRadius: '10px', border: '1px solid #DCFCE7' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#22C55E', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem' }}>{i + 1}</div>
                                                    <div>
                                                        <div style={{ fontWeight: 700, color: '#064E3B' }}>{s.name}</div>
                                                        <div style={{ fontSize: '0.75rem', color: '#059669' }}>{s.avgProgress}% Average Progress</div>
                                                    </div>
                                                </div>
                                                <button onClick={() => handleSendNotification(s._id, s.name)} className="btn" style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'white', color: '#22C55E' }}>
                                                    <Bell size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="card" style={{ padding: '30px', marginBottom: '40px' }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <AlertCircle size={24} color="#DC2626" /> At Risk Students (Bottom 5)
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                                    {engagementStats.bottomStudents.map((s, i) => (
                                        <div key={i} style={{ padding: '15px', backgroundColor: '#FEF2F2', borderRadius: '12px', border: '1px solid #FEE2E2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <div style={{ fontWeight: 700, color: '#991B1B' }}>{s.name}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#DC2626' }}>Progress: {s.avgProgress}%</div>
                                            </div>
                                            <button onClick={() => handleSendNotification(s._id, s.name)} className="btn" style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'white', color: '#DC2626' }}>
                                                <Bell size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'ai' && (
                        <div className="card" style={{ padding: '35px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>AI Personalization Hub</h2>
                                        <span style={{ backgroundColor: '#DBEAFE', color: '#1E40AF', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>Powered by Gemini AI</span>
                                    </div>
                                    <p style={{ color: '#64748B', margin: '8px 0 0' }}>Configure Luna-AI's identity, behavior, and speech patterns for students using Google's generative models</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>SYSTEM STATUS</div>
                                        <span style={{ fontWeight: 800, color: '#059669' }}>Operational</span>
                                    </div>
                                    <button onClick={handleSaveAIConfig} className="btn btn-primary" style={{ padding: '12px 25px', borderRadius: '10px' }}>
                                        Save Changes
                                    </button>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                    <div className="form-group" style={{ backgroundColor: '#F8FAFC', padding: '20px', borderRadius: '15px', border: '1px solid #E2E8F0' }}>
                                        <label style={{ color: '#1E293B', fontWeight: 800, marginBottom: '10px', display: 'block' }}>AI Identity & Details</label>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            <div>
                                                <label style={{ fontSize: '0.85rem', color: '#64748B' }}>Assistant Name</label>
                                                <input
                                                    type="text"
                                                    value={aiConfig.name}
                                                    onChange={e => setAiConfig({ ...aiConfig, name: e.target.value })}
                                                    placeholder="e.g., Dr. Chimps"
                                                    style={{ width: '100%', padding: '10px' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '0.85rem', color: '#64748B' }}>AI API Version</label>
                                                <input
                                                    type="text"
                                                    value={aiConfig.apiVersion}
                                                    onChange={e => setAiConfig({ ...aiConfig, apiVersion: e.target.value })}
                                                    placeholder="e.g., v1beta or v1"
                                                    style={{ width: '100%', padding: '10px' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '0.85rem', color: '#64748B' }}>Current Condition/Mood</label>
                                                <input
                                                    type="text"
                                                    value={aiConfig.condition}
                                                    onChange={e => setAiConfig({ ...aiConfig, condition: e.target.value })}
                                                    placeholder="e.g., Energetic and ready to help"
                                                    style={{ width: '100%', padding: '10px' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ backgroundColor: '#F8FAFC', padding: '20px', borderRadius: '15px', border: '1px solid #E2E8F0' }}>
                                        <label style={{ color: '#1E293B', fontWeight: 800, marginBottom: '10px', display: 'block' }}>AI Behavioural Logic</label>
                                        <textarea
                                            value={aiConfig.behaviour}
                                            onChange={e => setAiConfig({ ...aiConfig, behaviour: e.target.value })}
                                            placeholder="Describe how the AI should behave (e.g., proactive, wait for questions, strictly academic)..."
                                            style={{ minHeight: '100px', width: '100%' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                    <div className="form-group" style={{ backgroundColor: '#F8FAFC', padding: '20px', borderRadius: '15px', border: '1px solid #E2E8F0' }}>
                                        <label style={{ color: '#1E293B', fontWeight: 800, marginBottom: '10px', display: 'block' }}>Way of Speech (Tone & Style)</label>
                                        <textarea
                                            value={aiConfig.wayOfSpeech}
                                            onChange={e => setAiConfig({ ...aiConfig, wayOfSpeech: e.target.value })}
                                            placeholder="Specify speech patterns (e.g., use emojis, use simple language, professional tone)..."
                                            style={{ minHeight: '100px', width: '100%' }}
                                        />
                                    </div>

                                    <div className="form-group" style={{ backgroundColor: '#F8FAFC', padding: '20px', borderRadius: '15px', border: '1px solid #E2E8F0' }}>
                                        <label style={{ color: '#1E293B', fontWeight: 800, marginBottom: '10px', display: 'block' }}>Required Context & Knowledge</label>
                                        <textarea
                                            value={aiConfig.requiredDetails}
                                            onChange={e => setAiConfig({ ...aiConfig, requiredDetails: e.target.value })}
                                            placeholder="Enter specific content or details the AI must prioritize in its training..."
                                            style={{ minHeight: '150px', width: '100%' }}
                                        />
                                    </div>
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
                                            placeholder="Search users by name or email..."
                                            value={userSearchTerm}
                                            onChange={(e) => setUserSearchTerm(e.target.value)}
                                            style={{ padding: '10px 15px 10px 40px', borderRadius: '8px', border: '1px solid #CBD5E1', width: '300px' }}
                                        />
                                        <Users size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748B' }} />
                                    </div>
                                    <select
                                        value={userRoleFilter}
                                        onChange={(e) => setUserRoleFilter(e.target.value)}
                                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: 'white' }}
                                    >
                                        <option>All Roles</option>
                                        <option>Students</option>
                                        <option>Admins</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={handleExportData} className="btn" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Download size={16} /> Download CSV
                                    </button>
                                    <button onClick={() => setIsUserModalOpen(true)} className="btn btn-primary" style={{ fontSize: '0.85rem' }}>+ Create User</button>
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
                                        {users
                                            .filter(u => {
                                                const matchesSearch = u.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                                                    u.email.toLowerCase().includes(userSearchTerm.toLowerCase());
                                                const matchesRole = userRoleFilter === 'All Roles' ||
                                                    (userRoleFilter === 'Students' && u.role === 'student') ||
                                                    (userRoleFilter === 'Admins' && u.role === 'admin');
                                                return matchesSearch && matchesRole;
                                            })
                                            .map(u => (
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
                                                    <td style={{ padding: '15px 20px', color: '#64748B', fontSize: '0.85rem' }}>
                                                        {u.lastLogin ? new Date(u.lastLogin).toLocaleString('en-IN', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            hour12: true
                                                        }) : 'Never'}
                                                    </td>
                                                    <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                            {u.role === 'student' && (
                                                                <button
                                                                    onClick={() => fetchUserStats(u)}
                                                                    style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: '#F1F5F9', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                                                >
                                                                    <Eye size={16} color="#475569" />
                                                                </button>
                                                            )}
                                                            <button onClick={() => handleDeleteUser(u._id)} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: '#FEE2E2', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <Trash2 size={16} color="#DC2626" />
                                                            </button>
                                                        </div>
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
                                            value={courseSearchTerm}
                                            onChange={(e) => setCourseSearchTerm(e.target.value)}
                                            style={{ padding: '10px 15px 10px 40px', borderRadius: '8px', border: '1px solid #CBD5E1', width: '280px' }}
                                        />
                                        <BookOpen size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748B' }} />
                                    </div>
                                    <select value={courseCategory} onChange={(e) => setCourseCategory(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: 'white' }}>
                                        <option>All Categories</option>
                                        <option>Class 6-10</option>
                                        <option>Class 11-12</option>
                                        <option>NEET</option>
                                        <option>JEE</option>
                                        <option>UG Courses</option>
                                        <option>PG Courses</option>
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
                                        {adminCourses
                                            .filter(c => {
                                                const matchesSearch = c.title.toLowerCase().includes(courseSearchTerm.toLowerCase());
                                                const matchesCategory = courseCategory === 'All Categories' || c.category === courseCategory;
                                                return matchesSearch && matchesCategory;
                                            })
                                            .map(c => (
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
                                                            <button onClick={() => handleEditCourse(c)} style={{ padding: '6px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: 'white', cursor: 'pointer', color: '#1E40AF' }}>
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
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card" style={{ width: '500px', padding: '35px', maxHeight: '90vh', overflowY: 'auto' }}>
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
                                <label>Cover Image URL</label>
                                <input type="text" value={newCourse.image} onChange={e => setNewCourse({ ...newCourse, image: e.target.value })} placeholder="https://example.com/image.jpg" />
                            </div>
                            <div className="form-group">
                                <label>Intro Video URL (YouTube Embed)</label>
                                <input type="text" value={newCourse.introVideoUrl} onChange={e => setNewCourse({ ...newCourse, introVideoUrl: e.target.value })} placeholder="https://www.youtube.com/embed/..." />
                            </div>
                            <div className="form-group">
                                <label>Duration (Weeks)</label>
                                <input type="text" value={newCourse.duration} onChange={e => setNewCourse({ ...newCourse, duration: e.target.value })} placeholder="e.g., 40 Weeks" />
                            </div>
                            <div className="form-group">
                                <label>Short Description (Card View)</label>
                                <textarea value={newCourse.description} onChange={e => setNewCourse({ ...newCourse, description: e.target.value })} placeholder="Briefly describe the course for the catalog card..." />
                            </div>
                            <div className="form-group">
                                <label>Detailed Description</label>
                                <textarea value={newCourse.detailedDescription} onChange={e => setNewCourse({ ...newCourse, detailedDescription: e.target.value })} placeholder="Comprehensive description for the course details page..." style={{ minHeight: '120px' }} />
                            </div>
                            <div className="form-group">
                                <label>Key Theory / Course Content</label>
                                <textarea value={newCourse.theory} onChange={e => setNewCourse({ ...newCourse, theory: e.target.value })} placeholder="Enter the core theory and learning material for this course..." style={{ minHeight: '200px' }} />
                            </div>
                            <div className="form-group">
                                <label>Course Rating (0-5)</label>
                                <input type="number" step="0.1" min="0" max="5" value={newCourse.rating} onChange={e => setNewCourse({ ...newCourse, rating: parseFloat(e.target.value) })} />
                            </div>
                            <div className="form-group" style={{ border: '1px solid #E2E8F0', padding: '15px', borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                                <label style={{ fontSize: '1rem', fontWeight: 800, color: '#1E293B', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                    Final Assessment Questions
                                    <button type="button" onClick={() => {
                                        const updatedQuestions = [...(newCourse.assessment?.questions || []), { question: '', options: ['', '', '', ''], answer: '' }];
                                        setNewCourse({ ...newCourse, assessment: { ...newCourse.assessment, questions: updatedQuestions } });
                                    }} className="btn btn-primary" style={{ fontSize: '0.75rem', padding: '5px 12px' }}>+ Add Question</button>
                                </label>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {(newCourse.assessment?.questions || []).map((q, qIdx) => (
                                        <div key={qIdx} style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E2E8F0', position: 'relative' }}>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const updatedQuestions = newCourse.assessment.questions.filter((_, i) => i !== qIdx);
                                                    setNewCourse({ ...newCourse, assessment: { ...newCourse.assessment, questions: updatedQuestions } });
                                                }}
                                                style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                                            >
                                                <X size={18} />
                                            </button>

                                            <div style={{ marginBottom: '10px' }}>
                                                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Question {qIdx + 1}</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter question text..."
                                                    value={q.question}
                                                    onChange={(e) => {
                                                        const updatedQuestions = [...newCourse.assessment.questions];
                                                        updatedQuestions[qIdx].question = e.target.value;
                                                        setNewCourse({ ...newCourse, assessment: { ...newCourse.assessment, questions: updatedQuestions } });
                                                    }}
                                                    style={{ width: '100%', marginTop: '5px' }}
                                                />
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                                {(q.options || []).map((opt, oIdx) => (
                                                    <div key={oIdx}>
                                                        <label style={{ fontSize: '0.75rem', color: '#64748B' }}>Option {oIdx + 1}</label>
                                                        <input
                                                            type="text"
                                                            value={opt}
                                                            onChange={(e) => {
                                                                const updatedQuestions = [...newCourse.assessment.questions];
                                                                updatedQuestions[qIdx].options[oIdx] = e.target.value;
                                                                setNewCourse({ ...newCourse, assessment: { ...newCourse.assessment, questions: updatedQuestions } });
                                                            }}
                                                            style={{ width: '100%', padding: '8px', fontSize: '0.85rem' }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            <div style={{ marginTop: '10px' }}>
                                                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Correct Answer</label>
                                                <select
                                                    value={q.answer}
                                                    onChange={(e) => {
                                                        const updatedQuestions = [...newCourse.assessment.questions];
                                                        updatedQuestions[qIdx].answer = e.target.value;
                                                        setNewCourse({ ...newCourse, assessment: { ...newCourse.assessment, questions: updatedQuestions } });
                                                    }}
                                                    style={{ width: '100%', marginTop: '5px', padding: '8px' }}
                                                >
                                                    <option value="">Select correct option...</option>
                                                    {q.options.map((opt, oIdx) => (
                                                        <option key={oIdx} value={opt}>{opt || `Option ${oIdx + 1}`}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    Topics (Curriculum)
                                    <button type="button" onClick={() => setNewCourse({ ...newCourse, topics: [...(newCourse.topics || []), { title: '', videoUrl: '' }] })} style={{ fontSize: '0.7rem', padding: '2px 8px' }} className="btn">+ Add topic</button>
                                </label>
                                {(newCourse.topics || []).map((topic, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                                        <input type="text" placeholder="Topic Title" style={{ flex: 1 }} value={topic.title} onChange={e => {
                                            const updated = [...newCourse.topics];
                                            updated[idx].title = e.target.value;
                                            setNewCourse({ ...newCourse, topics: updated });
                                        }} />
                                        <input type="text" placeholder="Video URL" style={{ flex: 1 }} value={topic.videoUrl} onChange={e => {
                                            const updated = [...newCourse.topics];
                                            updated[idx].videoUrl = e.target.value;
                                            setNewCourse({ ...newCourse, topics: updated });
                                        }} />
                                        <button type="button" onClick={() => {
                                            const updated = newCourse.topics.filter((_, i) => i !== idx);
                                            setNewCourse({ ...newCourse, topics: updated });
                                        }} style={{ color: '#DC2626' }}><X size={14} /></button>
                                    </div>
                                ))}
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    Resources
                                    <button type="button" onClick={() => setNewCourse({ ...newCourse, resources: [...newCourse.resources, { title: '', url: '' }] })} style={{ fontSize: '0.7rem', padding: '2px 8px' }} className="btn">+ Add resource</button>
                                </label>
                                {newCourse.resources.map((res, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                                        <input type="text" placeholder="Title" value={res.title} onChange={e => {
                                            const updated = [...newCourse.resources];
                                            updated[idx].title = e.target.value;
                                            setNewCourse({ ...newCourse, resources: updated });
                                        }} style={{ flex: 1 }} />
                                        <input type="text" placeholder="URL" value={res.url} onChange={e => {
                                            const updated = [...newCourse.resources];
                                            updated[idx].url = e.target.value;
                                            setNewCourse({ ...newCourse, resources: updated });
                                        }} style={{ flex: 2 }} />
                                        <button type="button" onClick={() => {
                                            const updated = newCourse.resources.filter((_, i) => i !== idx);
                                            setNewCourse({ ...newCourse, resources: updated });
                                        }} style={{ padding: '5px', color: '#DC2626' }}><X size={14} /></button>
                                    </div>
                                ))}
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px', marginTop: '10px' }}>Save System Course</button>
                        </form>
                    </motion.div>
                </div>
            )}

            {isUserModalOpen && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 110, backdropFilter: 'blur(4px)' }}>
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card" style={{ width: '450px', padding: '35px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Create New User</h2>
                            <button onClick={() => setIsUserModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div className="form-group">
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '5px' }}>Full Name</label>
                                <input type="text" required value={newUserForm.name} onChange={e => setNewUserForm({ ...newUserForm, name: e.target.value })} placeholder="Student Name" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
                            </div>
                            <div className="form-group">
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '5px' }}>Email Address</label>
                                <input type="email" required value={newUserForm.email} onChange={e => setNewUserForm({ ...newUserForm, email: e.target.value })} placeholder="email@example.com" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
                            </div>
                            <div className="form-group">
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '5px' }}>Password</label>
                                <input type="password" required value={newUserForm.password} onChange={e => setNewUserForm({ ...newUserForm, password: e.target.value })} placeholder="••••••••" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
                            </div>

                            <div className="form-group">
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '5px' }}>Mobile Number</label>
                                <input type="text" value={newUserForm.mobileNumber} onChange={e => setNewUserForm({ ...newUserForm, mobileNumber: e.target.value })} placeholder="Enter mobile number" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
                            </div>
                            <div className="form-group">
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '5px' }}>Education</label>
                                <select value={newUserForm.category} onChange={e => setNewUserForm({ ...newUserForm, category: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: 'white' }}>
                                    <option value="">Select Education</option>
                                    <option value="Class 6-10">Class 6-10</option>
                                    <option value="Class 11-12">Class 11-12</option>
                                    <option value="NEET">NEET</option>
                                    <option value="JEE">JEE</option>
                                    <option value="UG Courses">UG Courses</option>
                                    <option value="PG Courses">PG Courses</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '5px' }}>Role</label>
                                <select value={newUserForm.role} onChange={e => setNewUserForm({ ...newUserForm, role: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: 'white' }}>
                                    <option value="student">Student</option>
                                    <option value="admin">Administrator</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '10px', fontWeight: 700 }}>Add Member to Platform</button>
                        </form>
                    </motion.div>
                </div>
            )
            }

            {
                isStatsModalOpen && selectedUser && (
                    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,10,30,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 120, backdropFilter: 'blur(8px)' }}>
                        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="card" style={{ width: '800px', maxWidth: '90vw', padding: '0', overflow: 'hidden', borderRadius: '20px' }}>
                            <div style={{ padding: '30px', background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)', color: 'white' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800 }}>
                                            {selectedUser.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{selectedUser.name}</h2>
                                            <p style={{ margin: 0, opacity: 0.8 }}>
                                                {selectedUser.email} • ID: {selectedUser._id.substring(0, 8)}
                                            </p>
                                            <p style={{ margin: '5px 0 0', fontSize: '0.75rem', opacity: 0.6 }}>
                                                Last Active: {selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleString('en-IN') : 'Never'}
                                            </p>
                                        </div>
                                    </div>
                                    <button onClick={() => setIsStatsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', opacity: 0.6 }}><X size={24} /></button>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginTop: '30px' }}>
                                    <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '5px' }}>Status</div>
                                        <div style={{
                                            display: 'inline-flex', padding: '2px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700,
                                            backgroundColor: !userStats ? 'transparent' : (userStats.category === 'Good' ? '#D1FAE5' : (userStats.category === 'Medium' ? '#FEF3C7' : '#FEE2E2')),
                                            color: !userStats ? 'white' : (userStats.category === 'Good' ? '#065F46' : (userStats.category === 'Medium' ? '#92400E' : '#991B1B'))
                                        }}>
                                            {userStats?.category || 'Evaluating...'}
                                        </div>
                                    </div>
                                    <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '5px' }}>Enrollments</div>
                                        <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{userStats?.enrolledCount || 0} Courses</div>
                                    </div>
                                    <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '5px' }}>Certificates</div>
                                        <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{userStats?.certificatesCount || 0} Earned</div>
                                    </div>
                                    <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '5px' }}>Avg. Progress</div>
                                        <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{userStats?.avgProgress || 0}%</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ padding: '30px', backgroundColor: 'white' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <h3 style={{ margin: 0, color: '#1E293B', fontWeight: 800 }}>Course breakdown</h3>
                                    <button
                                        disabled={!userStats}
                                        onClick={() => handleExportIndividualCSV(selectedUser, userStats)}
                                        className="btn"
                                        style={{ fontSize: '0.8rem', padding: '6px 15px', color: '#4F46E5', borderColor: '#E0E7FF' }}
                                    >
                                        <Download size={14} style={{ marginRight: '5px' }} /> Download Report
                                    </button>
                                </div>

                                {!userStats ? (
                                    <div style={{ padding: '40px', textAlign: 'center', color: '#94A3B8' }}>Aggregating student performance data...</div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
                                        {userStats.courses.map((c, i) => (
                                            <div key={i} style={{ padding: '15px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <div style={{ fontWeight: 700, color: '#1E293B' }}>{c.title}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Quiz Avg: {c.score}%</div>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '200px' }}>
                                                    <div style={{ flex: 1, height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px' }}>
                                                        <div style={{ width: `${c.progress}%`, height: '100%', backgroundColor: c.progress >= 100 ? '#10B981' : '#4F46E5', borderRadius: '3px' }}></div>
                                                    </div>
                                                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1E293B', minWidth: '40px' }}>{c.progress}%</span>
                                                </div>
                                            </div>
                                        ))}
                                        {userStats.courses.length === 0 && <div style={{ padding: '20px', textAlign: 'center', color: '#94A3B8' }}>No enrollment data found for this student.</div>}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )
            }

            {isEditCourseModalOpen && editingCourse && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }}>
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card" style={{ width: '500px', padding: '35px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <h2 style={{ margin: 0 }}>Edit System Course</h2>
                            <button onClick={() => setIsEditCourseModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleUpdateCourse} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="form-group">
                                <label>Course Title</label>
                                <input type="text" required value={editingCourse.title} onChange={e => setEditingCourse({ ...editingCourse, title: e.target.value })} placeholder="e.g., Quantum Physics Masterclass" />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    value={editingCourse.category}
                                    onChange={e => setEditingCourse({ ...editingCourse, category: e.target.value })}
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
                                <label>Cover Image URL</label>
                                <input type="text" value={editingCourse.image} onChange={e => setEditingCourse({ ...editingCourse, image: e.target.value })} placeholder="https://example.com/image.jpg" />
                            </div>
                            <div className="form-group">
                                <label>Intro Video URL (YouTube Embed)</label>
                                <input type="text" value={editingCourse.introVideoUrl} onChange={e => setEditingCourse({ ...editingCourse, introVideoUrl: e.target.value })} placeholder="https://www.youtube.com/embed/..." />
                            </div>
                            <div className="form-group">
                                <label>Duration (Weeks)</label>
                                <input type="text" value={editingCourse.duration} onChange={e => setEditingCourse({ ...editingCourse, duration: e.target.value })} placeholder="e.g., 40 Weeks" />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea value={editingCourse.description} onChange={e => setEditingCourse({ ...editingCourse, description: e.target.value })} placeholder="Briefly describe the course..." />
                            </div>
                            <div className="form-group">
                                <label>Course Rating (0-5)</label>
                                <input type="number" step="0.1" min="0" max="5" value={editingCourse.rating || 0} onChange={e => setEditingCourse({ ...editingCourse, rating: parseFloat(e.target.value) })} />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    Topics (Curriculum)
                                    <button type="button" onClick={() => setEditingCourse({ ...editingCourse, topics: [...(editingCourse.topics || []), { title: '', videoUrl: '' }] })} style={{ fontSize: '0.7rem', padding: '2px 8px' }} className="btn">+ Add topic</button>
                                </label>
                                {(editingCourse.topics || []).map((topic, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                                        <input type="text" placeholder="Topic Title" style={{ flex: 1 }} value={topic.title} onChange={e => {
                                            const updated = [...editingCourse.topics];
                                            updated[idx].title = e.target.value;
                                            setEditingCourse({ ...editingCourse, topics: updated });
                                        }} />
                                        <input type="text" placeholder="Video URL" style={{ flex: 1 }} value={topic.videoUrl} onChange={e => {
                                            const updated = [...editingCourse.topics];
                                            updated[idx].videoUrl = e.target.value;
                                            setEditingCourse({ ...editingCourse, topics: updated });
                                        }} />
                                        <button type="button" onClick={() => {
                                            const updated = editingCourse.topics.filter((_, i) => i !== idx);
                                            setEditingCourse({ ...editingCourse, topics: updated });
                                        }} style={{ color: '#DC2626' }}><X size={14} /></button>
                                    </div>
                                ))}
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    Resources
                                    <button type="button" onClick={() => setEditingCourse({ ...editingCourse, resources: [...(editingCourse.resources || []), { title: '', url: '' }] })} style={{ fontSize: '0.7rem', padding: '2px 8px' }} className="btn">+ Add resource</button>
                                </label>
                                {(editingCourse.resources || []).map((res, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                                        <input type="text" placeholder="Title" value={res.title} onChange={e => {
                                            const updated = [...editingCourse.resources];
                                            updated[idx].title = e.target.value;
                                            setEditingCourse({ ...editingCourse, resources: updated });
                                        }} style={{ flex: 1 }} />
                                        <input type="text" placeholder="URL" value={res.url} onChange={e => {
                                            const updated = [...editingCourse.resources];
                                            updated[idx].url = e.target.value;
                                            setEditingCourse({ ...editingCourse, resources: updated });
                                        }} style={{ flex: 2 }} />
                                        <button type="button" onClick={() => {
                                            const updated = editingCourse.resources.filter((_, i) => i !== idx);
                                            setEditingCourse({ ...editingCourse, resources: updated });
                                        }} style={{ padding: '5px', color: '#DC2626' }}><X size={14} /></button>
                                    </div>
                                ))}
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px', marginTop: '10px' }}>Update System Course</button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div >
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
