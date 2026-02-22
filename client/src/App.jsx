import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import AuthContext from './auth/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import Chatbot from './components/Chatbot';
import GlobalAlerts from './components/GlobalAlerts';

// UI Components
import LockedConceptPage from './components/ui/LockedConceptPage';

// Public Pages
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
// import Courses from './pages/Courses'; // Moving to protected/dashboard area
import HelpCenter from './pages/HelpCenter';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import { Terms, Cookies } from './pages/Legal';
import NotFound from './pages/NotFound';

// Dashboards
import StudentDashboard from './dashboards/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding'; // New Import
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail'; // Import
import CoursePlayer from './pages/CoursePlayer';
import Assessment from './pages/Assessment';
import Progress from './pages/Progress';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import VerifyCertificate from './pages/VerifyCertificate';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function DashboardIndexRedirect() {
  const { user, loading } = useContext(AuthContext);
  console.log("[DEBUG] DashboardIndexRedirect render - loading:", loading, "user:", user?.email, "role:", user?.role);

  if (loading) return null;
  if (!user) {
    console.log("[DEBUG] DashboardIndexRedirect - No user, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  const roleLower = user.role?.toLowerCase();
  if (roleLower === 'admin') {
    console.log("[DEBUG] DashboardIndexRedirect - Admin role, redirecting to /admin");
    return <Navigate to="/admin" replace />;
  }
  console.log("[DEBUG] DashboardIndexRedirect - Student role, redirecting to /dashboard/student");
  return <Navigate to="/dashboard/student" replace />;
}

// Redirects already-logged-in REAL users away from /login to their dashboard
// Demo users (isDemo:true) are treated as guests — they see the login form
function LoginRedirect() {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;
  // Allow demo users and unauthenticated users to see the login form
  if (!user || user.isDemo) return <Login />;
  const roleLower = user.role?.toLowerCase();
  if (roleLower === 'admin') return <Navigate to="/admin" replace />;
  return <Navigate to="/dashboard/student" replace />;
}

function AppContent() {
  const { user } = useContext(AuthContext);
  console.log("[DEBUG] AppContent render - current user:", user?.email, "role:", user?.role);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginRedirect />} />
        <Route path="/register" element={<Register />} />

        {/* Support & Legal */}
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/verify/:certId" element={<VerifyCertificate />} />

        {/* Protected Routes */}
        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route index element={<DashboardIndexRedirect />} />
          <Route path="student" element={<ProtectedRoute allowedRoles={['student']}><DashboardLayout role="student"><StudentDashboard /></DashboardLayout></ProtectedRoute>} />
          <Route path="instructor" element={<DashboardLayout role="instructor"><div>Instructor Dashboard Placeholder</div></DashboardLayout>} />
        </Route>

        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<DashboardLayout role="admin" />}>
            <Route index element={<AdminDashboard activeSection="overview" />} />
            <Route path="users" element={<AdminDashboard activeSection="users" />} />
            <Route path="system" element={<AdminDashboard activeSection="system" />} />
            <Route path="courses" element={<AdminDashboard activeSection="courses" />} />
            <Route path="progress" element={<AdminDashboard activeSection="progress" />} />
            <Route path="ai" element={<AdminDashboard activeSection="ai" />} />
          </Route>
        </Route>

        {/* Shared Internal Pages - Locked for Demo */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <DashboardLayout>{user?.isDemo ? <Navigate to="/register" replace /> : <Profile />}</DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/courses" element={
          <ProtectedRoute>
            <DashboardLayout>{user?.isDemo ? <Navigate to="/register" replace /> : <Courses />}</DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/courses/:id" element={
          <ProtectedRoute>
            <DashboardLayout>{user?.isDemo ? <Navigate to="/register" replace /> : <CourseDetail />}</DashboardLayout>
          </ProtectedRoute>
        } />

        {/* Learning Platform - Locked for Demo */}
        <Route path="/learn/:courseId" element={
          <ProtectedRoute>
            {user?.isDemo ? <Navigate to="/register" replace /> : <CoursePlayer />}
          </ProtectedRoute>
        } />
        <Route path="/assessment/:courseId" element={
          <ProtectedRoute>
            {user?.isDemo ? <Navigate to="/register" replace /> : <Assessment />}
          </ProtectedRoute>
        } />

        {/* Settings & Achievement Aliases - Locked for Demo */}
        <Route path="/settings" element={
          <ProtectedRoute>
            <DashboardLayout>{user?.isDemo ? <Navigate to="/register" replace /> : <Settings />}</DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/achievements" element={
          <ProtectedRoute>
            <DashboardLayout>{user?.isDemo ? <Navigate to="/register" replace /> : <Achievements />}</DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/progress" element={
          <ProtectedRoute>
            <DashboardLayout>{user?.isDemo ? <Navigate to="/register" replace /> : <Progress />}</DashboardLayout>
          </ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Chatbot />
      <GlobalAlerts />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
