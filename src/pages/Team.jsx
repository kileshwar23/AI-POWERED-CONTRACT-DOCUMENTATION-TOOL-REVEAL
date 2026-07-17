import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Search, UserPlus, MoreHorizontal, Shield } from 'lucide-react';

export const Team = () => {
  const teamMembers = [
    { name: 'John Doe', email: 'john@revel.ai', role: 'Owner', avatar: 'JD', color: 'from-[#8b5cf6] to-[#3b82f6]' },
    { name: 'Sarah Connor', email: 'sarah@revel.ai', role: 'Admin', avatar: 'SC', color: 'from-emerald-400 to-teal-500' },
    { name: 'Michael Scott', email: 'michael@revel.ai', role: 'Viewer', avatar: 'MS', color: 'from-orange-400 to-red-500' },
    { name: 'Jane Smith', email: 'jane@revel.ai', role: 'Editor', avatar: 'JS', color: 'from-pink-400 to-rose-500' },
  ];

  return (
    <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Team Collaboration</h1>
          <p className="text-[#a1a1aa]">Manage your team members, roles, and shared documents.</p>
        </div>
        <Button variant="primary" className="gap-2">
          <UserPlus className="h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <Card className="p-0 overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#18181b]/50">
        <div className="p-4 border-b border-[rgba(255,255,255,0.08)] bg-[#27272a]/30">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search team members..." 
              className="w-full bg-[#09090b] border border-[rgba(255,255,255,0.1)] rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#8b5cf6] transition-all text-white"
            />
          </div>
        </div>

        <div className="divide-y divide-[rgba(255,255,255,0.05)]">
          {teamMembers.map((member, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-full bg-gradient-to-tr ${member.color} p-[2px]`}>
                  <div className="h-full w-full rounded-full bg-[#09090b] flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{member.avatar}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium">{member.name}</h4>
                  <p className="text-sm text-gray-400">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#27272a] border border-[rgba(255,255,255,0.05)] text-xs text-gray-300">
                  <Shield className="h-3 w-3" />
                  {member.role}
                </div>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
