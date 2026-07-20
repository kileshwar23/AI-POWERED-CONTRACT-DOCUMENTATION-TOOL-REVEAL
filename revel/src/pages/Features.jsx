import React from 'react';
import { Card } from '../components/ui/Card';
import { Bot, FileText, AlertTriangle, FileSearch, ShieldCheck, Activity, Search, CalendarClock, Lightbulb, DownloadCloud, Lock, Users, Zap, FileJson, SplitSquareHorizontal } from 'lucide-react';

export const Features = () => {
  const featureList = [
    { icon: Bot, title: 'AI Contract Analysis', desc: 'Analyze contracts in seconds using advanced AI.', color: 'text-blue-400' },
    { icon: FileText, title: 'Smart Clause Extraction', desc: 'Automatically identify and extract important clauses.', color: 'text-purple-400' },
    { icon: AlertTriangle, title: 'Risk Detection', desc: 'Detect risky, unfair, or missing contract terms instantly.', color: 'text-red-400' },
    { icon: FileSearch, title: 'AI Contract Summary', desc: 'Generate concise, easy-to-read contract summaries.', color: 'text-emerald-400' },
    { icon: ShieldCheck, title: 'Compliance Checker', desc: 'Verify contracts against legal and regulatory standards.', color: 'text-green-400' },
    { icon: Activity, title: 'Risk Score', desc: 'Assign an overall risk rating to every document.', color: 'text-orange-400' },
    { icon: Search, title: 'Smart Search', desc: 'Search contracts using keywords, clauses, or topics.', color: 'text-blue-300' },
    { icon: CalendarClock, title: 'Deadline & Renewal', desc: 'Find important dates, deadlines, and renewal clauses automatically.', color: 'text-amber-400' },
    { icon: Lightbulb, title: 'AI Recommendations', desc: 'Get intelligent suggestions to improve contract quality.', color: 'text-yellow-400' },
    { icon: DownloadCloud, title: 'Export Reports', desc: 'Download professional reports in PDF or Word format.', color: 'text-cyan-400' },
    { icon: Lock, title: 'Secure Cloud Storage', desc: 'Store documents securely with encryption and privacy protection.', color: 'text-indigo-400' },
    { icon: Users, title: 'Team Collaboration', desc: 'Share documents, comments, and reviews with your team.', color: 'text-pink-400' },
    { icon: Zap, title: 'Lightning-Fast Processing', desc: 'Analyze even large legal documents within seconds.', color: 'text-yellow-500' },
    { icon: FileJson, title: 'Multi-Format Support', desc: 'Upload PDF, DOCX, and scanned documents with OCR support.', color: 'text-teal-400' },
    { icon: SplitSquareHorizontal, title: 'Version Comparison', desc: 'Compare two contract versions and highlight changes automatically.', color: 'text-rose-400' },
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Everything You Need. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6]">Powered by AI.</span></h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">Discover the complete suite of tools designed to streamline your legal workflow, reduce risk, and save you thousands of hours.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureList.map((feature, i) => (
          <Card key={i} className="bg-[#18181b]/60 border-[rgba(255,255,255,0.05)] hover:border-[#8b5cf6]/30 transition-all duration-300 group hover:-translate-y-1">
            <div className="p-6">
              <div className={`p-3 bg-[#27272a]/50 rounded-xl inline-flex mb-4 group-hover:scale-110 transition-transform ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#8b5cf6] transition-colors">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
