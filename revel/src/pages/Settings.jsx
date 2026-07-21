import React, { useState, useRef } from 'react';
import { User, CreditCard, Bell, Shield, Zap } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

import { useLocation } from 'react-router-dom';

export const Settings = () => {
  const { user, updateUser } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'profile');
  const fileInputRef = useRef(null);

  // Profile state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    profilePicture: user?.profilePicture || ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleAvatarSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setMessage('Image must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      setMessage('');
      const response = await authService.updateProfile(profileData);
      if (response.user) {
        updateUser(response.user);
      } else {
        updateUser(profileData);
      }
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full animate-fade-in">
      <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
      <p className="text-[#a1a1aa] mb-8">Manage your account preferences and billing details.</p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'profile' ? 'bg-[#8b5cf6]/20 text-[#8b5cf6] border border-[#8b5cf6]/30' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}>
            <User className="h-4 w-4" /> Profile
          </button>
          <button 
            onClick={() => setActiveTab('billing')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'billing' ? 'bg-[#8b5cf6]/20 text-[#8b5cf6] border border-[#8b5cf6]/30' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}>
            <CreditCard className="h-4 w-4" /> Billing & Plans
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'notifications' ? 'bg-[#8b5cf6]/20 text-[#8b5cf6] border border-[#8b5cf6]/30' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}>
            <Bell className="h-4 w-4" /> Notifications
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'security' ? 'bg-[#8b5cf6]/20 text-[#8b5cf6] border border-[#8b5cf6]/30' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}>
            <Shield className="h-4 w-4" /> Security
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-8">
          
          {activeTab === 'profile' && (
            <Card className="bg-[#18181b]/50 border-[rgba(255,255,255,0.05)] p-8 animate-fade-in">
              <h2 className="text-xl font-semibold text-white mb-6">Profile Information</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#3b82f6] p-0.5 shadow-lg">
                    <div className="h-full w-full rounded-full bg-[#09090b] border-2 border-transparent flex items-center justify-center overflow-hidden relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                      {profileData.profilePicture ? (
                        <img src={profileData.profilePicture} alt="Avatar" className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-2xl font-bold text-white">
                          {profileData.name ? profileData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs text-white font-medium">Edit</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleAvatarSelect} 
                      accept="image/jpeg, image/png, image/webp" 
                      className="hidden" 
                    />
                    <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>Change Avatar</Button>
                  </div>
                </div>

                {message && (
                  <div className={`p-3 rounded-lg text-sm ${message.includes('successfully') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    {message}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Full Name</label>
                    <input type="text" name="name" value={profileData.name} onChange={handleProfileChange} className="w-full bg-[#27272a]/50 border border-[rgba(255,255,255,0.1)] rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email Address</label>
                    <input type="email" name="email" value={profileData.email} onChange={handleProfileChange} className="w-full bg-[#27272a]/50 border border-[rgba(255,255,255,0.1)] rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Role / Job Title</label>
                    <input type="text" name="role" value={profileData.role} onChange={handleProfileChange} placeholder="e.g. Legal Counsel" className="w-full bg-[#27272a]/50 border border-[rgba(255,255,255,0.1)] rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Phone Number</label>
                    <input type="tel" name="phone" value={profileData.phone} onChange={handleProfileChange} placeholder="+1 (555) 000-0000" className="w-full bg-[#27272a]/50 border border-[rgba(255,255,255,0.1)] rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-300">Bio</label>
                    <textarea name="bio" value={profileData.bio} onChange={handleProfileChange} rows="3" placeholder="Tell us a little bit about yourself..." className="w-full bg-[#27272a]/50 border border-[rgba(255,255,255,0.1)] rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all resize-none"></textarea>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-[rgba(255,255,255,0.05)] flex justify-end">
                  <Button variant="primary" onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'billing' && (
            <Card className="bg-gradient-to-br from-[#8b5cf6]/10 to-transparent border-[#8b5cf6]/30 p-8 relative overflow-hidden group hover:border-[#8b5cf6]/50 transition-colors animate-fade-in">
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
          )}

          {activeTab === 'notifications' && (
            <Card className="bg-[#18181b]/50 border-[rgba(255,255,255,0.05)] p-8 animate-fade-in">
              <h2 className="text-xl font-semibold text-white mb-6">Notification Preferences</h2>
              <p className="text-gray-400">Manage how and when you receive notifications.</p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#27272a]/30 rounded-xl border border-white/5">
                  <div>
                    <h3 className="font-medium text-white">Email Notifications</h3>
                    <p className="text-sm text-gray-400">Receive daily summaries and alerts</p>
                  </div>
                  <div className="w-11 h-6 bg-[#8b5cf6] rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card className="bg-[#18181b]/50 border-[rgba(255,255,255,0.05)] p-8 animate-fade-in">
              <h2 className="text-xl font-semibold text-white mb-6">Security Settings</h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-md font-medium text-white">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="text-sm font-medium text-gray-300">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full mt-1 bg-[#27272a]/50 border border-[rgba(255,255,255,0.1)] rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#8b5cf6]" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full mt-1 bg-[#27272a]/50 border border-[rgba(255,255,255,0.1)] rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#8b5cf6]" />
                    </div>
                    <Button variant="primary">Update Password</Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
};
