import React from 'react';
import { FileText, GitBranch, LayoutDashboard, Settings as SettingsIcon, Zap, Users } from 'lucide-react';
import { Button } from './ui/Button';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  
  const NavItem = ({ to, icon: Icon, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        <Icon className="h-4 w-4" />
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
              <NavItem to="/documents" icon={FileText}>Library</NavItem>
              <NavItem to="/features" icon={Zap}>Features</NavItem>
              <NavItem to="/team" icon={Users}>Team</NavItem>
              <NavItem to="/settings" icon={SettingsIcon}>Settings</NavItem>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:flex gap-2">
              <GitBranch className="h-5 w-5" />
              <span>Star on GitHub</span>
            </Button>
            <Button variant="primary" className="h-10 px-5 hidden sm:flex">
              New Analysis
            </Button>
            <Link to="/login">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#3b82f6] p-[2px] cursor-pointer hover:scale-105 transition-transform shadow-[0_0_10px_rgba(139,92,246,0.2)] ml-2">
                <div className="h-full w-full rounded-full bg-[#18181b] flex items-center justify-center">
                  <span className="text-xs font-bold">JD</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
