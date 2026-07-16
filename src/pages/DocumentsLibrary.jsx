import React from 'react';
import { Search, Filter, FileText, AlertTriangle, CheckCircle, Clock, MoreVertical, Download, Trash2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const DocumentsLibrary = () => {
  const documents = [
    { id: 1, name: 'Service Level Agreement - Acme Corp.pdf', date: 'Oct 24, 2026', type: 'SLA', status: 'High Risk', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/30' },
    { id: 2, name: 'Non-Disclosure Agreement_v2.docx', date: 'Oct 23, 2026', type: 'NDA', status: 'Clean', icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/30' },
    { id: 3, name: 'Vendor Contract 2026.pdf', date: 'Oct 22, 2026', type: 'Contract', status: 'Pending Review', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/30' },
    { id: 4, name: 'Employment Agreement - Sarah Connor.pdf', date: 'Oct 20, 2026', type: 'Employment', status: 'Clean', icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/30' },
    { id: 5, name: 'Lease Agreement 101 Main St.pdf', date: 'Oct 18, 2026', type: 'Lease', status: 'Medium Risk', icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/30' },
  ];

  return (
    <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Document Library</h1>
          <p className="text-[#a1a1aa]">Manage and search through all your analyzed contracts.</p>
        </div>
        <Button variant="primary" className="whitespace-nowrap">Upload New</Button>
      </div>

      <Card className="p-0 overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#18181b]/50">
        <div className="p-4 border-b border-[rgba(255,255,255,0.08)] flex flex-col md:flex-row gap-4 bg-[#27272a]/30">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search documents by name, type, or content..." 
              className="w-full bg-[#09090b] border border-[rgba(255,255,255,0.1)] rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all text-white"
            />
          </div>
          <Button variant="secondary" className="gap-2 shrink-0">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#27272a]/20 border-b border-[rgba(255,255,255,0.05)] text-[#a1a1aa]">
              <tr>
                <th className="px-6 py-4 font-medium">Document Name</th>
                <th className="px-6 py-4 font-medium">Date Uploaded</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#27272a] rounded-lg group-hover:bg-[#8b5cf6]/20 transition-colors border border-[rgba(255,255,255,0.05)] group-hover:border-[#8b5cf6]/30">
                        <FileText className="h-5 w-5 text-[#a1a1aa] group-hover:text-[#8b5cf6]" />
                      </div>
                      <span className="font-medium text-white group-hover:text-[#8b5cf6] transition-colors">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{doc.date}</td>
                  <td className="px-6 py-4 text-gray-400">{doc.type}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex px-2.5 py-1 rounded-full items-center gap-1.5 text-xs font-medium border ${doc.color} ${doc.bg}`}>
                      <doc.icon className="h-3 w-3" />
                      {doc.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" className="h-8 w-8 p-0"><Download className="h-4 w-4" /></Button>
                      <Button variant="ghost" className="h-8 w-8 p-0 hover:text-red-400"><Trash2 className="h-4 w-4" /></Button>
                      <Button variant="ghost" className="h-8 w-8 p-0"><MoreVertical className="h-4 w-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
