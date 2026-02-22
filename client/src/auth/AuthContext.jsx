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
                // Handle both wrapped { user: {...} } and flat response shapes
                const userData = data.user || data;
                setUser({ ...userData, token }); // user object from backend + token
            } catch (error) {
                console.error("Token invalid", error);
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        if (user) {
            // Apply theme
            document.documentElement.setAttribute('data-theme', user.theme || 'light');

            // Apply font size
            const fontSizes = {
                small: '14px',
                medium: '16px',
                large: '18px'
            };
            document.documentElement.style.fontSize = fontSizes[user.fontSize || 'medium'];
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.documentElement.style.fontSize = '16px';
        }
    }, [user]);

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const login = async (email, password) => {
        console.log("Login attempt in AuthContext:", { email, password });

        try {
            const { data } = await axios.post('/api/auth/login', { email, password });
            console.log("[DEBUG] AuthContext - Login response data:", data);
            console.log("[DEBUG] AuthContext - Login response data keys:", Object.keys(data));
            if (!data.role) {
                console.error("[DEBUG] AuthContext - CRITICAL: Login response is missing 'role' field!");
            }
            localStorage.setItem('token', data.token);
            // Handle both wrapped { user: {...}, token } and flat response shapes
            const userData = data.user || data;
            setUser({ ...userData, token: data.token }); // role comes strictly from backend
            return data;
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            throw error;
        }
    };

    useEffect(() => {
        console.log("[DEBUG] AuthContext - User state changed:", user?.email, "Role:", user?.role);
    }, [user]);

    const register = async (name, category, mobileNumber, email, password, role) => {
        try {
            console.log("Attempting registration for:", email);
            const { data } = await axios.post('/api/auth/register', { name, category, educationLevel: category, mobileNumber, email, password, role });
            console.log("Registration success:", data);
            localStorage.setItem('token', data.token);
            const regUserData = data.user || data;
            setUser({ ...regUserData, token: data.token });
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

    const updateUser = async (updatedData) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const { data } = await axios.put('/api/auth/profile', updatedData, config);
            setUser({ ...data, token });
            return data;
        } catch (error) {
            console.error("Update user error", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
