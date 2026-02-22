import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user || !user.role) {
        console.log("[DEBUG] ProtectedRoute - No user or missing role, redirecting to /login");
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.map(r => r.toLowerCase()).includes(user.role?.toLowerCase())) {
        const roleLower = user.role?.toLowerCase();
        const fallback = roleLower === 'admin' ? '/admin' : '/dashboard/student';
        console.warn("[DEBUG] ProtectedRoute - Role mismatch. User role:", user.role, "Allowed roles:", allowedRoles, "Redirecting to", fallback);
        return <Navigate to={fallback} replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
