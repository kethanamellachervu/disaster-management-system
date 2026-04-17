import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import './App.css';

// Pages
import Login from './pages/Auth/Login';
import SurvivorRegistration from './pages/Field/SurvivorRegistration';
import AdminDashboard from './pages/Dashboard/AdminDashboard';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SurvivorRegistration />} />
      
      {/* Route all authenticated roles to the functional dashboard temporarily */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'volunteer', 'survivor']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Dedicated survivor panel placeholder. Currently redirected to dashboard. */}
      <Route path="/survivor" element={<Navigate to="/dashboard" replace />} />

      {/* Wildcard fallback for undefined routes */}
      <Route 
        path="*" 
        element={
          <div className="auth-bg min-h-screen flex items-center justify-center flex-col gap-4 p-4">
            <div className="glass-card rounded-2xl p-10 text-center max-w-md w-full fade-in">
              <h1 className="text-6xl font-black text-gray-200 mb-2">404</h1>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Page Not Found</h2>
              <p className="text-gray-500 text-sm mb-6">The route you are looking for is currently being developed.</p>
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center py-3 px-6 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emergency-red to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-500/25 transition-all"
              >
                Return to Dashboard
              </a>
            </div>
          </div>
        } 
      />
    </Routes>
  );
};

export default App;
