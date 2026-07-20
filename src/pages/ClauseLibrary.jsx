import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Search, Plus, BookOpen, AlertTriangle, ShieldCheck } from 'lucide-react';
// import { clauseLibraryService } from '../services/clauseLibraryService';

export const ClauseLibrary = () => {
  const [clauses, setClauses] = useState([
    { id: 1, name: 'Standard Confidentiality', type: 'Confidentiality', standardText: 'All information shared under this agreement shall remain strictly confidential.', riskLevel: 'LOW' },
    { id: 2, name: 'Standard Liability', type: 'Liability', standardText: 'Neither party shall be liable for indirect, incidental, or consequential damages.', riskLevel: 'MEDIUM' },
  ]);
  const [loading, setLoading] = useState(false);

  // Use useEffect to fetch from backend in real implementation

  return (
    <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Clause Library</h1>
          <p className="text-[#a1a1aa]">Manage your organization's standard clauses and risk tolerances.</p>
        </div>
        <Button variant="primary" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Standard Clause
        </Button>
      </div>

      <Card className="p-0 overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#18181b]/50">
        <div className="p-4 border-b border-[rgba(255,255,255,0.08)] bg-[#27272a]/30">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search clause library..." 
              className="w-full bg-[#09090b] border border-[rgba(255,255,255,0.1)] rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#8b5cf6] transition-all text-white"
            />
          </div>
        </div>

        <div className="divide-y divide-[rgba(255,255,255,0.05)]">
          {clauses.map((clause) => (
            <div key={clause.id} className="p-6 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#27272a] rounded-lg border border-[rgba(255,255,255,0.05)]">
                    <BookOpen className="h-5 w-5 text-[#8b5cf6]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{clause.name}</h3>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{clause.type}</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${clause.riskLevel === 'LOW' ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20' : 'bg-amber-400/10 text-amber-400 border border-amber-400/20'}`}>
                  {clause.riskLevel === 'LOW' ? <ShieldCheck className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                  {clause.riskLevel} RISK
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-300 leading-relaxed p-4 bg-black/20 rounded-xl border border-[rgba(255,255,255,0.05)]">
                {clause.standardText}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
