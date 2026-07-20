import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Dashboard } from './pages/Dashboard';
import { DocumentViewer } from './pages/DocumentViewer';
import { Login } from './pages/Login';
import { DocumentsLibrary } from './pages/DocumentsLibrary';
import { Settings } from './pages/Settings';
import { Features } from './pages/Features';
import { Team } from './pages/Team';
import { Compare } from './pages/Compare';
import { ClauseLibrary } from './pages/ClauseLibrary';
import { AuditTrail } from './pages/AuditTrail';
import { useAuth } from './context/AuthContext';

function Layout() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isAuthPage = location.pathname === '/login';

  return (
    <div className="min-h-screen text-white w-full overflow-x-hidden">
      {!isAuthPage && isAuthenticated && <Navbar />}
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/documents" element={<ProtectedRoute><DocumentsLibrary /></ProtectedRoute>} />
        <Route path="/document/:id" element={<ProtectedRoute><DocumentViewer /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/features" element={<ProtectedRoute><Features /></ProtectedRoute>} />
        <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
        <Route path="/compare" element={<ProtectedRoute><Compare /></ProtectedRoute>} />
        <Route path="/library" element={<ProtectedRoute><ClauseLibrary /></ProtectedRoute>} />
        <Route path="/audit" element={<ProtectedRoute><AuditTrail /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
