import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BlogManagement from './pages/BlogManagement';
import ProjectManagement from './pages/ProjectManagement';
import ContactManagement from './pages/ContactManagement';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import './styles/admin.css';

console.log('🔧 Admin Panel: Loading with full app structure');

interface User {
  username: string;
  name: string;
  role: string;
}

// Main App Component
const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (user: User) => {
    console.log('🔧 Admin Panel: Login successful for:', user);
    setIsLoading(true);

    // Store user in state
    setCurrentUser(user);

    // Store authentication state (in a real app, you'd use proper auth context)
    localStorage.setItem('admin_user', JSON.stringify(user));
    localStorage.setItem('admin_authenticated', 'true');

    setIsLoading(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_token');
  };

  // Check if user is already logged in on app start
  React.useEffect(() => {
    const storedUser = localStorage.getItem('admin_user');
    const isAuthenticated = localStorage.getItem('admin_authenticated');

    if (storedUser && isAuthenticated === 'true') {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_authenticated');
      }
    }
  }, []);

  // Show loading spinner during login
  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ margin: 0, color: '#666' }}>Logging you in...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <Router>
      {!currentUser ? (
        // Show login page
        <Routes>
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      ) : (
        // Show main app with sidebar
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
          <Sidebar />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <header style={{
              backgroundColor: 'white',
              borderBottom: '1px solid #e2e8f0',
              padding: '1rem 1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h1 style={{ margin: 0, color: '#1f2937', fontSize: '1.5rem', fontWeight: '600' }}>
                Admin Panel
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Welcome, {currentUser.name || currentUser.username}
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                >
                  Logout
                </button>
              </div>
            </header>

            {/* Main content */}
            <main style={{
              flex: 1,
              padding: '1.5rem',
              overflowY: 'auto'
            }}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/blog" element={<BlogManagement />} />
                <Route path="/projects" element={<ProjectManagement />} />
                <Route path="/contacts" element={<ContactManagement />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </Router>
  );
};

const container = document.getElementById('root');
console.log('🔧 Admin Panel: Root container found:', !!container);

if (container) {
  console.log('🔧 Admin Panel: Creating React root...');
  try {
    const root = createRoot(container);
    console.log('🔧 Admin Panel: Rendering main App component...');
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('🔧 Admin Panel: App component rendered successfully');
  } catch (error) {
    console.error('🔧 Admin Panel: Error rendering app:', error);
    container.innerHTML = `
      <div style="background: red; color: white; padding: 20px; font-family: Arial;">
        <h1>❌ REACT ERROR</h1>
        <p>Error: ${error.message}</p>
        <p>Check console for more details</p>
      </div>
    `;
  }
} else {
  console.error('🔧 Admin Panel: Root container not found!');
  document.body.innerHTML = `
    <div style="background: red; color: white; padding: 20px; font-family: Arial;">
      <h1>❌ NO ROOT CONTAINER</h1>
      <p>The div with id="root" was not found in the HTML</p>
    </div>
  `;
}
