import React, { useState } from 'react';
import { FileText, MessageSquare, AlertTriangle, ChevronRight, Share2, Download, CheckCircle, Clock, Check, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const DocumentViewer = () => {
  const [activeTab, setActiveTab] = useState('insights'); // 'insights', 'threads', 'workflow'

  return (
    <div className="pt-20 h-screen flex flex-col md:flex-row overflow-hidden animate-fade-in w-full">
      
      {/* Left side - Document Viewer */}
      <div className="flex-1 border-r border-[rgba(255,255,255,0.08)] flex flex-col bg-[#09090b]">
        <div className="p-4 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between bg-[#18181b]/50 backdrop-blur-md">
          <div className="flex items-center gap-3 text-sm text-[#a1a1aa]">
            <span className="hover:text-white cursor-pointer transition-colors">Contracts</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white font-medium truncate max-w-[200px]">Service Level Agreement - Acme Corp.pdf</span>
            <span className="bg-[#8b5cf6]/20 text-[#8b5cf6] text-[10px] px-2 py-0.5 rounded-full border border-[#8b5cf6]/30">v2</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" className="h-8 px-2 hover:bg-white/5"><Share2 className="h-4 w-4" /></Button>
            <Button variant="ghost" className="h-8 px-2 hover:bg-white/5"><Download className="h-4 w-4" /></Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-8 flex justify-center bg-[#09090b] custom-scrollbar">
          <div className="w-full max-w-3xl bg-white text-black p-12 min-h-[1056px] shadow-2xl rounded-sm font-serif leading-relaxed opacity-90 hover:opacity-100 transition-opacity relative">
            <h1 className="text-2xl font-bold text-center mb-8 tracking-wide">SERVICE LEVEL AGREEMENT</h1>
            <p className="mb-6 text-gray-700">This Service Level Agreement ("SLA") is entered into by and between Acme Corp ("Provider") and the Client, effective as of the date of the last signature below.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Scope of Services</h2>
            <p className="mb-4 text-gray-700">The Provider agrees to deliver the software services described in Appendix A (the "Services"). The Provider will ensure a 99.9% uptime for the Services, excluding scheduled maintenance.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. <span className="bg-red-100 px-1 py-0.5 rounded cursor-help border-b-2 border-red-400" title="High Risk: Termination without cause">Termination</span></h2>
            <p className="mb-4 bg-red-50 p-3 rounded-lg border border-red-200 text-gray-700 relative">
              <span className="absolute -left-3 -top-3 bg-red-500 text-white rounded-full p-1 shadow-md">
                <AlertTriangle className="w-4 h-4" />
              </span>
              Either party may terminate this Agreement at any time, with or without cause, upon thirty (30) days prior written notice. <span className="line-through text-red-400">However, Provider reserves the right to terminate immediately if Client fails to pay fees within 5 days of invoice.</span> <span className="text-emerald-600 bg-emerald-50 px-1 font-medium border-b border-emerald-400">However, Provider reserves the right to terminate if Client fails to pay fees within 30 days of invoice.</span>
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Liability</h2>
            <p className="mb-4 text-gray-700 cursor-pointer hover:bg-blue-50 border-l-2 border-transparent hover:border-blue-500 pl-2 transition-all">In no event shall either party be liable for any indirect, incidental, special or consequential damages, or damages for loss of profits, revenue, data or use, incurred by either party or any third party.</p>
          </div>
        </div>
      </div>

      {/* Right side - Sidebar Tabs */}
      <div className="w-full md:w-[400px] flex flex-col bg-[#18181b] border-l border-[rgba(255,255,255,0.08)] z-10 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
        
        {/* Tabs */}
        <div className="flex border-b border-[rgba(255,255,255,0.08)]">
          <button onClick={() => setActiveTab('insights')} className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${activeTab === 'insights' ? 'text-[#8b5cf6] border-b-2 border-[#8b5cf6]' : 'text-gray-400 hover:text-white'}`}>AI Insights</button>
          <button onClick={() => setActiveTab('threads')} className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${activeTab === 'threads' ? 'text-[#8b5cf6] border-b-2 border-[#8b5cf6]' : 'text-gray-400 hover:text-white'}`}>Threads (1)</button>
          <button onClick={() => setActiveTab('workflow')} className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${activeTab === 'workflow' ? 'text-[#8b5cf6] border-b-2 border-[#8b5cf6]' : 'text-gray-400 hover:text-white'}`}>Workflow</button>
        </div>

        <div className="flex-1 overflow-auto p-4 custom-scrollbar">
          {activeTab === 'insights' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-xs font-bold text-[#a1a1aa] mb-3 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span> Critical Risks (1)
                </h3>
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]">
                  <h4 className="font-medium text-red-400 mb-1 flex items-start gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    Aggressive Termination Clause
                  </h4>
                  <p className="text-sm text-red-200/70 mb-4 leading-relaxed">
                    The provider can terminate immediately if payment is delayed by 5 days. Industry standard is typically 30 days.
                  </p>
                  <Button variant="danger" className="text-xs h-8 px-4 w-full justify-center">Generate Redline</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-xs font-bold text-[#a1a1aa] mb-3 uppercase tracking-widest">Library Comparison</h3>
                <div className="bg-[#27272a]/50 p-4 rounded-xl border border-[rgba(255,255,255,0.05)]">
                  <p className="text-sm text-gray-300 mb-2">Clause 3 (Liability) deviates from standard.</p>
                  <Button variant="secondary" className="w-full text-xs">View Diff</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'threads' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-[#27272a] rounded-xl border border-[rgba(255,255,255,0.1)] p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold">JD</div>
                    <span className="text-sm font-medium">John Doe</span>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30 uppercase font-bold">Redline</span>
                </div>
                <p className="text-sm text-gray-300 italic border-l-2 border-[#8b5cf6] pl-2 mb-3 bg-[#18181b] p-2 rounded-r">
                  "...reserves the right to terminate immediately if Client fails to pay fees within 5 days of invoice."
                </p>
                <p className="text-sm text-white mb-4">Changed to 30 days to align with our standard MSA.</p>
                <div className="flex gap-2">
                  <Button variant="primary" className="flex-1 text-xs h-8">Accept</Button>
                  <Button variant="ghost" className="flex-1 text-xs h-8">Reject</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workflow' && (
            <div className="animate-fade-in space-y-6">
              <div className="relative border-l-2 border-[rgba(255,255,255,0.1)] ml-3 space-y-8 mt-2">
                <div className="relative">
                  <div className="absolute -left-[21px] bg-emerald-500 text-white rounded-full p-1 border-4 border-[#18181b]">
                    <Check className="w-3 h-3" />
                  </div>
                  <div className="pl-4">
                    <h4 className="text-sm font-semibold text-white">Drafted & Uploaded</h4>
                    <p className="text-xs text-gray-400">By Sarah Connor</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[21px] bg-amber-500 text-white rounded-full p-1 border-4 border-[#18181b]">
                    <Clock className="w-3 h-3" />
                  </div>
                  <div className="pl-4">
                    <h4 className="text-sm font-semibold text-white">Pending Review</h4>
                    <p className="text-xs text-gray-400 mb-2">Waiting on Legal Team</p>
                    <div className="flex gap-2">
                       <Button variant="primary" className="h-7 text-xs px-3">Approve</Button>
                       <Button variant="ghost" className="h-7 text-xs px-3 text-red-400 hover:text-red-300">Reject</Button>
                    </div>
                  </div>
                </div>

                <div className="relative opacity-50">
                  <div className="absolute -left-[21px] bg-gray-600 text-white rounded-full p-1 border-4 border-[#18181b]">
                    <Users className="w-3 h-3" />
                  </div>
                  <div className="pl-4">
                    <h4 className="text-sm font-semibold text-white">Out for Signature</h4>
                    <p className="text-xs text-gray-400">Locked until review is complete</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input for Insights */}
        {activeTab === 'insights' && (
          <div className="p-4 border-t border-[rgba(255,255,255,0.08)] bg-[#18181b]">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask AI about this contract..." 
                  className="w-full bg-[#27272a] border border-[rgba(255,255,255,0.1)] rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-[#8b5cf6] transition-all text-white"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-lg transition-all">
                  <MessageSquare className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
