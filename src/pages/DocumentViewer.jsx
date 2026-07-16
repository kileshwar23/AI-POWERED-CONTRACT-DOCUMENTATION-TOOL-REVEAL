import React from 'react';
import { FileText, MessageSquare, AlertTriangle, ChevronRight, Share2, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const DocumentViewer = () => {
  return (
    <div className="pt-20 h-screen flex flex-col md:flex-row overflow-hidden animate-fade-in w-full">
      
      {/* Left side - Document Viewer */}
      <div className="flex-1 border-r border-[rgba(255,255,255,0.08)] flex flex-col bg-[#09090b]">
        <div className="p-4 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between bg-[#18181b]/50 backdrop-blur-md">
          <div className="flex items-center gap-3 text-sm text-[#a1a1aa]">
            <span className="hover:text-white cursor-pointer transition-colors">Documents</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white font-medium truncate max-w-[200px]">Service Level Agreement - Acme Corp.pdf</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" className="h-8 px-2 hover:bg-white/5"><Share2 className="h-4 w-4" /></Button>
            <Button variant="ghost" className="h-8 px-2 hover:bg-white/5"><Download className="h-4 w-4" /></Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-8 flex justify-center bg-[#09090b] custom-scrollbar">
          <div className="w-full max-w-3xl bg-white text-black p-12 min-h-[1056px] shadow-2xl rounded-sm font-serif leading-relaxed opacity-90 hover:opacity-100 transition-opacity">
            <h1 className="text-2xl font-bold text-center mb-8 tracking-wide">SERVICE LEVEL AGREEMENT</h1>
            <p className="mb-6 text-gray-700">This Service Level Agreement ("SLA") is entered into by and between Acme Corp ("Provider") and the Client, effective as of the date of the last signature below.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Scope of Services</h2>
            <p className="mb-4 text-gray-700">The Provider agrees to deliver the software services described in Appendix A (the "Services"). The Provider will ensure a 99.9% uptime for the Services, excluding scheduled maintenance.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. <span className="bg-red-100 px-1 py-0.5 rounded cursor-help border-b-2 border-red-400" title="High Risk: Termination without cause">Termination</span></h2>
            <p className="mb-4 bg-red-50 p-3 rounded-lg border border-red-200 text-gray-700 relative">
              <span className="absolute -left-3 -top-3 bg-red-500 text-white rounded-full p-1 shadow-md">
                <AlertTriangle className="w-4 h-4" />
              </span>
              Either party may terminate this Agreement at any time, with or without cause, upon thirty (30) days prior written notice. <span className="font-bold text-red-600 bg-red-100/50">However, Provider reserves the right to terminate immediately if Client fails to pay fees within 5 days of invoice.</span>
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Liability</h2>
            <p className="mb-4 text-gray-700">In no event shall either party be liable for any indirect, incidental, special or consequential damages, or damages for loss of profits, revenue, data or use, incurred by either party or any third party.</p>
          </div>
        </div>
      </div>

      {/* Right side - AI Insights & Chat */}
      <div className="w-full md:w-[400px] flex flex-col bg-[#18181b] border-l border-[rgba(255,255,255,0.08)] z-10 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-4 border-b border-[rgba(255,255,255,0.08)] bg-gradient-to-r from-[#18181b] to-[#27272a]">
          <h2 className="font-semibold text-lg flex items-center gap-2 text-white drop-shadow-sm">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            AI Analysis
          </h2>
        </div>
        
        <div className="flex-1 overflow-auto p-4 space-y-6 custom-scrollbar">
          <div className="animate-fade-in-delayed">
            <h3 className="text-xs font-bold text-[#a1a1aa] mb-3 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Critical Risks (1)
            </h3>
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]">
              <h4 className="font-medium text-red-400 mb-1 flex items-start gap-2 text-sm">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Aggressive Termination Clause
              </h4>
              <p className="text-sm text-red-200/70 mb-4 leading-relaxed">
                The provider can terminate immediately if payment is delayed by 5 days. Industry standard is typically 30 days.
              </p>
              <Button variant="danger" className="text-xs h-8 px-4 w-full justify-center">Suggest Revision</Button>
            </div>
          </div>
          
          <div className="animate-fade-in-delayed" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xs font-bold text-[#a1a1aa] mb-3 uppercase tracking-widest">Summary</h3>
            <div className="text-sm text-gray-300 leading-relaxed bg-[#27272a]/50 p-4 rounded-xl border border-[rgba(255,255,255,0.05)] shadow-inner">
              <p>This is a standard SLA for software services. It guarantees <strong className="text-emerald-400 font-medium">99.9% uptime</strong> and limits liability for indirect damages.</p>
              <p className="mt-2 text-red-300/80">However, the termination clause strongly favors the provider and poses a significant operational risk.</p>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-[rgba(255,255,255,0.08)] bg-[#18181b]">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask anything about this contract..." 
                className="w-full bg-[#27272a] border border-[rgba(255,255,255,0.1)] rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all placeholder-[#a1a1aa] text-white"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#8b5cf6] hover:bg-[#7c3aed] hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] text-white rounded-lg transition-all duration-300">
                <MessageSquare className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="text-[10px] text-center text-[#a1a1aa] mt-3 uppercase tracking-wider">AI can make mistakes. Verify legal details.</p>
        </div>
      </div>
    </div>
  );
};
