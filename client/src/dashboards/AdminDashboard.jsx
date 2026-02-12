import { useContext } from 'react';
import AuthContext from '../auth/AuthContext';
import StatCard from '../components/ui/StatCard';
import { Users, BookOpen, Activity, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%' }}>

            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ marginBottom: '10px', fontSize: '2rem' }}>Admin Portal</h1>
                <p style={{ color: '#64748B' }}>System Overview and Management.</p>
            </div>

            {/* Admin Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px', marginBottom: '40px' }}>
                <StatCard title="Total Students" value="1,240" icon={<Users size={24} />} variant="default" />
                <StatCard title="Active Courses" value="18" icon={<BookOpen size={24} />} variant="default" />
                <StatCard title="System Health" value="98%" icon={<Activity size={24} />} variant="solid-green" />
                <StatCard title="Reports" value="3" icon={<AlertCircle size={24} />} variant="default" subtitle="Pending Review" />
            </div>

            <div className="card" style={{ minHeight: '300px' }}>
                <h3 style={{ marginBottom: '20px' }}>Recent Activity Log</h3>
                <p style={{ color: '#64748B' }}>System logs and user registration data will appear here.</p>

                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                        <span><strong>New Student</strong> registered</span>
                        <span style={{ color: '#64748B' }}>2 mins ago</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                        <span><strong>Course Updated:</strong> Advanced Calculus</span>
                        <span style={{ color: '#64748B' }}>1 hour ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
