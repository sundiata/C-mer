import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import BlogManagement from './pages/BlogManagement';
import ProjectManagement from './pages/ProjectManagement';
import ContactManagement from './pages/ContactManagement';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import apiService from './services/api';
import './styles/admin.css';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = React.useState<{
    username: string;
    name: string;
    role: string;
  } | null>(null);

  // Test API connection on app load
  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('Testing API connection...');
        const response = await apiService.healthCheck();
        console.log('API connection successful:', response);
      } catch (error) {
        console.error('API connection failed:', error);
      }
    };

    testAPI();
  }, []);

  // Handle successful login
  const handleLogin = (user: { username: string; name: string; role: string }) => {
    setCurrentUser(user);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.warn('Logout error:', error);
    } finally {
      setCurrentUser(null);
    }
  };

  // Admin layout component
  const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">Admin Panel</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {currentUser?.name || currentUser?.username}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Temporary: Show login directly for debugging */}
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Protected routes - temporarily disabled for debugging */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <BlogManagement />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <ProjectManagement />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <ContactManagement />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Settings />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
