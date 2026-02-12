import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../auth/AuthContext';
import { BookOpen, School, Plus, Trash2, CheckCircle } from 'lucide-react';

const Onboarding = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        educationLevel: 'High School',
        instituteName: '',
        mobile: '',
        subjects: [
            { name: 'Mathematics', currentMarks: 0, totalMarks: 100 },
            { name: 'Physics', currentMarks: 0, totalMarks: 100 },
            { name: 'English', currentMarks: 0, totalMarks: 100 },
            { name: 'Computer Science', currentMarks: 0, totalMarks: 100 }
        ]
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubjectChange = (index, field, value) => {
        const newSubjects = [...formData.subjects];
        newSubjects[index][field] = value;
        setFormData({ ...formData, subjects: newSubjects });
    };

    const addSubject = () => {
        setFormData({
            ...formData,
            subjects: [...formData.subjects, { name: '', currentMarks: 0, totalMarks: 100 }]
        });
    };

    const removeSubject = (index) => {
        const newSubjects = formData.subjects.filter((_, i) => i !== index);
        setFormData({ ...formData, subjects: newSubjects });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            await axios.post('/api/profile', formData, config);

            // Success - Redirect to Dashboard
            navigate('/dashboard/student');
        } catch (error) {
            console.error("Onboarding Error:", error);
            alert("Failed to save profile. Please check if the server is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
            <div className="card" style={{ maxWidth: '800px', width: '100%', padding: '40px', backgroundColor: 'white' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '10px', color: 'var(--primary)' }}>Welcome, {user?.name}!</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Let's set up your academic profile to personalize your learning experience.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Education Details */}
                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <School size={20} color="var(--primary)" /> Institute Details
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>Education Level</label>
                                <select name="educationLevel" value={formData.educationLevel} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                    <option value="High School">High School</option>
                                    <option value="Undergraduate">Undergraduate</option>
                                    <option value="Postgraduate">Postgraduate</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Institute/School Name</label>
                                <input type="text" name="instituteName" value={formData.instituteName} onChange={handleChange} required placeholder="e.g. Springfield High" />
                            </div>
                            <div className="form-group">
                                <label>Mobile Number</label>
                                <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="+1 234 567 890" />
                            </div>
                        </div>
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '30px 0' }} />

                    {/* Subject Details */}
                    <div>
                        <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <BookOpen size={20} color="var(--primary)" /> Academic Performance
                        </h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Enter your subjects and marks for analysis.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {formData.subjects.map((subject, index) => (
                                <div key={index} style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', backgroundColor: '#F9FAFB', padding: '15px', borderRadius: '12px' }}>
                                    <div style={{ flex: 2 }}>
                                        <label style={{ fontSize: '0.85rem', marginBottom: '5px', display: 'block' }}>Subject Name</label>
                                        <input
                                            type="text"
                                            value={subject.name}
                                            onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                                            placeholder="Subject"
                                            required
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontSize: '0.85rem', marginBottom: '5px', display: 'block' }}>Marks Obtained</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={subject.currentMarks}
                                            onChange={(e) => handleSubjectChange(index, 'currentMarks', Number(e.target.value))}
                                            required
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontSize: '0.85rem', marginBottom: '5px', display: 'block' }}>Total Marks</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={subject.totalMarks}
                                            onChange={(e) => handleSubjectChange(index, 'totalMarks', Number(e.target.value))}
                                            required
                                        />
                                    </div>
                                    <button type="button" onClick={() => removeSubject(index)} style={{ padding: '12px', backgroundColor: '#FEE2E2', color: '#EF4444', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button type="button" onClick={addSubject} className="btn" style={{ marginTop: '20px', backgroundColor: 'var(--secondary-light)', color: 'var(--primary)', width: '100%', border: '1px dashed var(--primary)' }}>
                            <Plus size={18} style={{ marginRight: '8px' }} /> Add Another Subject
                        </button>
                    </div>

                    <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="submit" className="btn btn-primary" style={{ padding: '14px 40px', fontSize: '1.1rem' }} disabled={loading}>
                            {loading ? 'Setting up...' : 'Complete Setup & Go to Dashboard'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Onboarding;
