import React from 'react';
import { User, CreditCard, Bell, Shield, Zap } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const Settings = () => {
  return (
    <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full animate-fade-in">
      <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
      <p className="text-[#a1a1aa] mb-8">Manage your account preferences and billing details.</p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg bg-[#8b5cf6]/20 text-[#8b5cf6] border border-[#8b5cf6]/30 transition-all">
            <User className="h-4 w-4" /> Profile
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <CreditCard className="h-4 w-4" /> Billing & Plans
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <Bell className="h-4 w-4" /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <Shield className="h-4 w-4" /> Security
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-8">
          
          <Card className="bg-[#18181b]/50 border-[rgba(255,255,255,0.05)] p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Profile Information</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#3b82f6] p-0.5 shadow-lg">
                  <div className="h-full w-full rounded-full bg-[#09090b] border-2 border-transparent flex items-center justify-center overflow-hidden relative group cursor-pointer">
                    <span className="text-2xl font-bold text-white">JD</span>
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs text-white font-medium">Edit</span>
                    </div>
                  </div>
                </div>
                <Button variant="secondary">Change Avatar</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Full Name</label>
                  <input type="text" defaultValue="John Doe" className="w-full bg-[#27272a]/50 border border-[rgba(255,255,255,0.1)] rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email Address</label>
                  <input type="email" defaultValue="admin@example.com" className="w-full bg-[#27272a]/50 border border-[rgba(255,255,255,0.1)] rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all" />
                </div>
              </div>
              
              <div className="pt-4 border-t border-[rgba(255,255,255,0.05)] flex justify-end">
                <Button variant="primary">Save Changes</Button>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-[#8b5cf6]/10 to-transparent border-[#8b5cf6]/30 p-8 relative overflow-hidden group hover:border-[#8b5cf6]/50 transition-colors">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none group-hover:scale-110 duration-500">
              <Zap className="h-32 w-32 text-[#8b5cf6]" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2 relative z-10 flex items-center gap-2">
              Pro Plan Active
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#8b5cf6] text-white">PRO</span>
            </h2>
            <p className="text-[#a1a1aa] mb-6 relative z-10">You are currently on the Pro plan. Billed $49/month.</p>
            
            <div className="mb-6 relative z-10">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white font-medium">API Usage</span>
                <span className="text-gray-400">45 / 100 Documents</span>
              </div>
              <div className="h-2 w-full bg-[#27272a] rounded-full overflow-hidden">
                <div className="h-full bg-[#8b5cf6] w-[45%] rounded-full shadow-[0_0_10px_#8b5cf6]"></div>
              </div>
            </div>

            <Button variant="secondary" className="relative z-10 bg-white/5 border-white/10 hover:bg-white/10 text-white">Manage Subscription</Button>
          </Card>

        </div>
      </div>
    </div>
  );
};
