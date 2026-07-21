import React from 'react';
import { FileText, GitBranch, LayoutDashboard, Settings as SettingsIcon, Zap, Users, BookOpen, Activity } from 'lucide-react';
import { Button } from './ui/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try { await authService.logout(); } catch { /* ignore */ }
    logout();
    navigate('/login');
  };

  // Generate initials from user name
  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';
  
  const NavItem = ({ to, icon: Icon, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {children}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-[rgba(255,255,255,0.05)] rounded-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 cursor-pointer">
              <div className="p-2.5 bg-[#8b5cf6]/20 rounded-xl border border-[#8b5cf6]/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <FileText className="h-6 w-6 text-[#8b5cf6]" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white drop-shadow-sm">Revel</span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              <NavItem to="/" icon={LayoutDashboard}>Dashboard</NavItem>
              <NavItem to="/documents" icon={FileText}>Contracts</NavItem>
              <NavItem to="/library" icon={BookOpen}>Clause Library</NavItem>
              <NavItem to="/audit" icon={Activity}>Audit Log</NavItem>
              <NavItem to="/team" icon={Users}>Team</NavItem>
              <NavItem to="/settings" icon={SettingsIcon}>Settings</NavItem>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex gap-2 items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <GitBranch className="h-5 w-5" />
              <span>Star on GitHub</span>
            </a>
            <Button 
              variant="primary" 
              className="h-10 px-5 hidden sm:flex"
              onClick={() => navigate('/documents')}
            >
              New Analysis
            </Button>
            <div className="flex items-center gap-2 ml-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#3b82f6] p-[2px] cursor-pointer hover:scale-105 transition-transform shadow-[0_0_10px_rgba(139,92,246,0.2)]">
                <div className="h-full w-full rounded-full bg-[#18181b] flex items-center justify-center overflow-hidden">
                  {user?.profilePicture ? (
                    <img src={user.profilePicture} alt="Avatar" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-white">{initials}</span>
                  )}
                </div>
              </div>
              <Button variant="ghost" className="h-10 px-3 text-red-400 hover:text-red-300 hover:bg-red-400/10" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
