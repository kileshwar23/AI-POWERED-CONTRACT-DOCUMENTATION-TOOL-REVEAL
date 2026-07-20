import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Activity, FileText, CheckCircle, PenTool, Edit3, User, Clock } from 'lucide-react';

export const AuditTrail = () => {
  const [logs] = useState([
    { id: 1, action: 'UPLOADED', documentName: 'MSA_AcmeCorp.pdf', user: 'John Doe', timestamp: new Date(Date.now() - 86400000).toLocaleString() },
    { id: 2, action: 'ANALYZED', documentName: 'MSA_AcmeCorp.pdf', user: 'System (AI)', timestamp: new Date(Date.now() - 82400000).toLocaleString() },
    { id: 3, action: 'REDLINE_APPLIED', documentName: 'MSA_AcmeCorp.pdf', user: 'Sarah Connor', timestamp: new Date(Date.now() - 40000000).toLocaleString() },
    { id: 4, action: 'APPROVED', documentName: 'MSA_AcmeCorp.pdf', user: 'John Doe', timestamp: new Date(Date.now() - 3600000).toLocaleString() },
  ]);

  const getIconForAction = (action) => {
    switch (action) {
      case 'UPLOADED': return <FileText className="h-4 w-4 text-blue-400" />;
      case 'ANALYZED': return <Activity className="h-4 w-4 text-purple-400" />;
      case 'REDLINE_APPLIED': return <Edit3 className="h-4 w-4 text-amber-400" />;
      case 'APPROVED': return <CheckCircle className="h-4 w-4 text-emerald-400" />;
      case 'SIGNED': return <PenTool className="h-4 w-4 text-teal-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Audit Trail</h1>
        <p className="text-[#a1a1aa]">Organization-wide activity and compliance logs.</p>
      </div>

      <Card className="p-0 border border-[rgba(255,255,255,0.08)] bg-[#18181b]/50">
        <div className="p-6">
          <div className="relative border-l-2 border-[rgba(255,255,255,0.1)] ml-4">
            {logs.map((log, idx) => (
              <div key={log.id} className="mb-8 ml-8 relative">
                <span className="absolute -left-[41px] top-1 h-8 w-8 rounded-full bg-[#27272a] border-2 border-[#18181b] flex items-center justify-center">
                  {getIconForAction(log.action)}
                </span>
                <div className="bg-[#27272a]/30 p-4 rounded-xl border border-[rgba(255,255,255,0.05)] hover:bg-[#27272a]/50 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-white">{log.action.replace('_', ' ')}</h3>
                    <span className="text-xs text-gray-500">{log.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    <span className="font-medium text-gray-200">{log.documentName}</span> was {log.action.toLowerCase().replace('_', ' ')} by <span className="text-[#8b5cf6]">{log.user}</span>.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
