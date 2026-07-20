import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileText, ArrowRight, Check, X, SplitSquareHorizontal } from 'lucide-react';

export const Compare = () => {
  return (
    <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full animate-fade-in h-[calc(100vh-80px)] flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <SplitSquareHorizontal className="h-8 w-8 text-[#8b5cf6]" />
            Version Comparison
          </h1>
          <p className="text-[#a1a1aa]">Automatically detect and highlight differences between two contract versions.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="gap-2"><X className="h-4 w-4" /> Reject Changes</Button>
          <Button variant="primary" className="gap-2"><Check className="h-4 w-4" /> Accept All</Button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0 pb-10">
        {/* Version 1 (Original) */}
        <Card className="flex-1 flex flex-col bg-[#18181b]/50 border-[rgba(255,255,255,0.08)] overflow-hidden p-0">
          <div className="p-4 border-b border-[rgba(255,255,255,0.08)] bg-[#27272a]/30 flex items-center gap-3 shrink-0">
            <div className="p-2 bg-[#27272a] rounded-lg">
              <FileText className="h-4 w-4 text-gray-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Service Level Agreement_v1.pdf</h3>
              <p className="text-xs text-gray-400">Uploaded Oct 20, 2026</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4 text-gray-300 text-sm leading-relaxed font-serif bg-white/[0.01]">
            <p>1.1 The Provider shall provide the Services to the Customer in accordance with the terms and conditions of this Agreement.</p>
            <p className="bg-red-500/20 text-red-200 p-1 -mx-1 rounded">1.2 The Provider guarantees an uptime of 99.0% during the term of this Agreement.</p>
            <p>1.3 In the event of a breach, the Customer must notify the Provider within <span className="bg-red-500/20 text-red-200 p-0.5 rounded">30 days</span>.</p>
            <p>1.4 This agreement is governed by the laws of the State of California.</p>
          </div>
        </Card>

        <div className="flex items-center justify-center shrink-0">
          <div className="p-2 bg-[#27272a]/50 rounded-full border border-[rgba(255,255,255,0.05)] shadow-lg">
            <ArrowRight className="h-5 w-5 text-gray-500" />
          </div>
        </div>

        {/* Version 2 (Revised) */}
        <Card className="flex-1 flex flex-col bg-[#18181b]/50 border-[#8b5cf6]/30 overflow-hidden p-0 shadow-[0_0_30px_rgba(139,92,246,0.1)]">
          <div className="p-4 border-b border-[rgba(255,255,255,0.08)] bg-[#8b5cf6]/10 flex items-center gap-3 shrink-0">
            <div className="p-2 bg-[#8b5cf6]/20 rounded-lg">
              <FileText className="h-4 w-4 text-[#8b5cf6]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Service Level Agreement_v2_final.pdf</h3>
              <p className="text-xs text-[#8b5cf6]">Uploaded Oct 24, 2026</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4 text-gray-300 text-sm leading-relaxed font-serif bg-white/[0.01]">
            <p>1.1 The Provider shall provide the Services to the Customer in accordance with the terms and conditions of this Agreement.</p>
            <p className="bg-emerald-500/20 text-emerald-200 p-1 -mx-1 rounded border-l-2 border-emerald-500 pl-1.5">1.2 The Provider guarantees an uptime of 99.9% during the term of this Agreement.</p>
            <p>1.3 In the event of a breach, the Customer must notify the Provider within <span className="bg-emerald-500/20 text-emerald-200 p-0.5 rounded">15 days</span>.</p>
            <p>1.4 This agreement is governed by the laws of the State of California.</p>
            <p className="bg-emerald-500/20 text-emerald-200 p-1 -mx-1 rounded border-l-2 border-emerald-500 pl-1.5">1.5 The Provider maintains SOC2 Type II compliance for data protection.</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
