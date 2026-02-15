import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import apiService from '../services/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('ProtectedRoute: Checking authentication...');
        // Check if we have a token in localStorage
        const token = localStorage.getItem('admin_token');
        console.log('ProtectedRoute: Token found:', !!token);

        if (!token) {
          console.log('ProtectedRoute: No token found, redirecting to login');
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Verify the token with the backend
        console.log('ProtectedRoute: Verifying token with backend...');
        const response = await apiService.verifyToken();
        console.log('ProtectedRoute: Token verification response:', response);
        setIsAuthenticated(response.success);
      } catch (error) {
        console.error('ProtectedRoute: Auth verification failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="text-gray-700">Verifying authentication...</span>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render protected content if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
