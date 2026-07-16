import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { FileText, GitBranch, Mail, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#09090b] relative overflow-hidden w-full">
      {/* Background gradients */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#8b5cf6]/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#3b82f6]/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md animate-fade-in relative z-10 mt-10">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-[#8b5cf6]/20 rounded-2xl border border-[#8b5cf6]/30 shadow-[0_0_20px_rgba(139,92,246,0.3)] mb-4">
            <FileText className="h-8 w-8 text-[#8b5cf6]" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-sm mb-2 transition-all">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-[#a1a1aa] transition-all">
            {isLogin ? 'Sign in to access your intelligent workspace' : 'Join Revel to start analyzing contracts'}
          </p>
        </div>

        <Card className="bg-[#18181b]/80 border-[rgba(255,255,255,0.05)] backdrop-blur-xl shadow-2xl p-8 transition-all duration-300">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {!isLogin && (
              <div className="space-y-2 text-left animate-fade-in">
                <label className="text-sm font-medium text-gray-300">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-[#8b5cf6] transition-colors" />
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-[#27272a]/50 border border-[rgba(255,255,255,0.1)] rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2 text-left">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-[#8b5cf6] transition-colors" />
                <input 
                  type="email" 
                  placeholder="you@example.com" 
                  className="w-full bg-[#27272a]/50 border border-[rgba(255,255,255,0.1)] rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-300">Password</label>
                {isLogin && (
                  <a href="#" className="text-xs text-[#8b5cf6] hover:text-[#7c3aed] transition-colors">Forgot password?</a>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-[#8b5cf6] transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-[#27272a]/50 border border-[rgba(255,255,255,0.1)] rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
                  required
                />
              </div>
            </div>

            <Button variant="primary" className="w-full h-11 text-base transition-all">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.1)]"></div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.1)]"></div>
          </div>

          <Button variant="secondary" className="w-full mt-6 h-11 gap-2 border-[rgba(255,255,255,0.05)] bg-white/5 hover:bg-white/10 transition-all">
            <GitBranch className="h-5 w-5" />
            {isLogin ? 'Continue with SSO' : 'Sign up with SSO'}
          </Button>
        </Card>
        
        <p className="text-center text-sm text-gray-500 mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-white hover:text-[#8b5cf6] transition-colors font-medium bg-transparent border-none p-0 cursor-pointer"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};
