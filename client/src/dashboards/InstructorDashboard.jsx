import { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import AuthContext from '../auth/AuthContext';

const InstructorDashboard = () => {
    const { user } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({ title: '', description: '' });
    const [message, setMessage] = useState('');

    const fetchCourses = async () => {
        try {
            const { data } = await api.get('/courses');
            setCourses(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        try {
            await api.post('/courses', newCourse);
            setMessage('Course created successfully!');
            setNewCourse({ title: '', description: '' });
            fetchCourses();
        } catch (error) {
            setMessage('Error creating course');
        }
    };

    return (
        <div className="container" style={{ padding: '20px 0' }}>
            <h2>Instructor Dashboard - {user?.name}</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginTop: '20px' }}>
                <div className="card">
                    <h3>Create New Course</h3>
                    {message && <div style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</div>}
                    <form onSubmit={handleCreateCourse}>
                        <div className="form-group">
                            <label>Course Title</label>
                            <input
                                type="text"
                                value={newCourse.title}
                                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                value={newCourse.description}
                                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Create Course</button>
                    </form>
                </div>

                <div className="card">
                    <h3>Your Courses</h3>
                    {courses.length > 0 ? (
                        <ul>
                            {courses.map(course => (
                                <li key={course._id} style={{ marginBottom: '10px' }}>
                                    <strong>{course.title}</strong> - {course.description}
                                </li>
                            ))}
                        </ul>
                    ) : <p>No courses found.</p>}
                </div>
            </div>

            {/* Future: Add Update Progress Form here */}
        </div>
    );
};

export default InstructorDashboard;
