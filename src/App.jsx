import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { DocumentViewer } from './pages/DocumentViewer';
import { Login } from './pages/Login';
import { DocumentsLibrary } from './pages/DocumentsLibrary';
import { Settings } from './pages/Settings';
import { Features } from './pages/Features';
import { Team } from './pages/Team';
import { Compare } from './pages/Compare';

function Layout() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login';

  return (
    <div className="min-h-screen text-white w-full overflow-x-hidden">
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/documents" element={<DocumentsLibrary />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/document/:id" element={<DocumentViewer />} />
        <Route path="/features" element={<Features />} />
        <Route path="/team" element={<Team />} />
        <Route path="/compare" element={<Compare />} />
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
