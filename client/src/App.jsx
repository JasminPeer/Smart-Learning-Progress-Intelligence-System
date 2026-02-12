import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import Chatbot from './components/Chatbot';

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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Support & Legal */}
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />

          {/* Protected Routes */}
          <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route index element={<Navigate to="/dashboard/student" replace />} />
            <Route path="student" element={<DashboardLayout role="student"><StudentDashboard /></DashboardLayout>} />
            <Route path="admin" element={<DashboardLayout role="admin" />}>
              <Route index element={<AdminDashboard activeSection="overview" />} />
              <Route path="users" element={<AdminDashboard activeSection="users" />} />
              <Route path="system" element={<AdminDashboard activeSection="system" />} />
              <Route path="courses" element={<AdminDashboard activeSection="courses" />} />
              <Route path="progress" element={<AdminDashboard activeSection="progress" />} />
            </Route>
          </Route>

          {/* Shared Internal Pages */}
          <Route path="/profile" element={<ProtectedRoute><DashboardLayout><Profile /></DashboardLayout></ProtectedRoute>} />
          <Route path="/courses" element={<ProtectedRoute><DashboardLayout><Courses /></DashboardLayout></ProtectedRoute>} />
          <Route path="/courses/:id" element={<ProtectedRoute><DashboardLayout><CourseDetail /></DashboardLayout></ProtectedRoute>} />

          {/* Learning Platform */}
          <Route path="/learn/:courseId" element={<ProtectedRoute><CoursePlayer /></ProtectedRoute>} />
          <Route path="/assessment/:courseId" element={<ProtectedRoute><Assessment /></ProtectedRoute>} />

          {/* Settings & Achievement Aliases */}
          <Route path="/settings" element={<ProtectedRoute><DashboardLayout><Settings /></DashboardLayout></ProtectedRoute>} />
          <Route path="/achievements" element={<ProtectedRoute><DashboardLayout><Achievements /></DashboardLayout></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><DashboardLayout><Progress /></DashboardLayout></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
        <Chatbot />
      </Router>
    </AuthProvider>
  );
}

export default App;
