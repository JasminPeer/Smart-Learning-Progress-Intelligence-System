import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkUserLoggedIn = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                // Verify token and get latest user details
                const { data } = await axios.get('/api/auth/me', config);
                setUser({ ...data, token }); // user object from backend + token
            } catch (error) {
                console.error("Token invalid", error);
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const login = async (email, password) => {
        // Special check for demo - simpler than full backend roundtrip for this UI task
        if (email === 'demo@learniq.com' && password === 'demo123') {
            const demoUser = {
                id: 'demo-123',
                name: 'Guest User',
                email: 'demo@learniq.com',
                role: 'student',
                isDemo: true // FLAG FOR RESTRICTED MODE
            };
            // Mock token
            localStorage.setItem('token', 'demo-token');
            setUser(demoUser);
            return demoUser;
        }

        const { data } = await axios.post('/api/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        setUser(data);
        return data;
    };

    const register = async (name, educationLevel, mobileNumber, email, password, role) => {
        try {
            console.log("Attempting registration for:", email);
            const { data } = await axios.post('/api/auth/register', { name, educationLevel, mobileNumber, email, password, role });
            console.log("Registration success:", data);
            localStorage.setItem('token', data.token);
            setUser(data);
            return data;
        } catch (error) {
            console.error("Registration Error Detail:", error.response?.data || error.message);
            throw error; // Re-throw to be caught by component
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
