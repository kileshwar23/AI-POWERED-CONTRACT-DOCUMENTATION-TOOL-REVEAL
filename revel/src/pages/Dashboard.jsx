import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud, FileText, AlertTriangle, CheckCircle, Clock, Loader2, Archive, XCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { documentService } from '../services/documentService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [stats, setStats] = useState({ analyzed: 0, risksIdentified: 0, timeSaved: 0 });
  const [recentDocs, setRecentDocs] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await documentService.getDocumentStatistics();
        setStats({
          analyzed: statsData.analyzed || 0,
          risksIdentified: statsData.risksIdentified || 0,
          timeSaved: statsData.timeSaved || 0
        });
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
      
      try {
        const adminRoles = ['ADMIN', 'OWNER', 'ORG_ADMIN', 'SYSTEM_ADMIN'];
        let docs = [];
        if (user?.role && adminRoles.includes(user.role)) {
          const res = await documentService.getAllAdminDocuments();
          docs = res?.documents || [];
        } else {
          docs = await documentService.getAllDocuments() || [];
        }
        // Assuming docs are sorted by newest first, otherwise we would sort them by createdAt
        setRecentDocs(docs.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch recent documents", error);
      } finally {
        setLoadingDocs(false);
      }
    };
    fetchData();
  }, [user?.role]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await documentService.uploadDocument(file);
      navigate('/documents');
    } catch (error) {
      console.error("Failed to upload document", error);
      alert("Failed to upload. Make sure you are logged in.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full animate-fade-in">
      
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white to-[#a1a1aa] bg-clip-text text-transparent drop-shadow-lg">
          Contract Intelligence,<br/>Elevated.
        </h1>
        <p className="text-xl text-[#a1a1aa] max-w-2xl mx-auto">
          Upload your legal documents and let our AI instantly extract key clauses, identify risks, and generate comprehensive summaries.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
          <Card 
            className="border-dashed border-2 border-[#8b5cf6]/40 bg-[#8b5cf6]/5 hover:bg-[#8b5cf6]/10 transition-all duration-300 cursor-pointer group flex flex-col items-center justify-center p-12 text-center h-[300px]"
            onClick={!uploading ? handleUploadClick : undefined}
          >
            <div className="w-20 h-20 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              {uploading ? <Loader2 className="h-10 w-10 text-[#8b5cf6] animate-spin" /> : <UploadCloud className="h-10 w-10 text-[#8b5cf6]" />}
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-white">{uploading ? 'Uploading...' : 'Upload a Document'}</h3>
            <p className="text-[#a1a1aa] mb-6">Drag and drop your PDF or Word file here, or click to browse.</p>
            <Button variant="primary" disabled={uploading}>Select File</Button>
          </Card>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-white">
              <Clock className="h-6 w-6 text-[#a1a1aa]" />
              Recent Analysis
            </h3>
            <div className="space-y-4 animate-fade-in-delayed">
              {loadingDocs ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-[#8b5cf6]" />
                </div>
              ) : recentDocs.length === 0 ? (
                <div className="text-center py-8 text-[#a1a1aa]">No documents analyzed yet.</div>
              ) : (
                recentDocs.map((doc) => {
                  let statusUI = { icon: Clock, label: 'Pending', color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/30' };
                  if (doc.status === 'APPROVED') statusUI = { icon: CheckCircle, label: 'Approved', color: 'text-green-500', bg: 'bg-green-500/10 border-green-500/30' };
                  else if (doc.status === 'REJECTED') statusUI = { icon: XCircle, label: 'Rejected', color: 'text-red-500', bg: 'bg-red-500/10 border-red-500/30' };
                  else if (doc.status === 'ANALYZED') statusUI = { icon: CheckCircle, label: 'Analyzed', color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/30' };
                  else if (doc.status === 'ARCHIVED') statusUI = { icon: Archive, label: 'Archived', color: 'text-gray-400', bg: 'bg-gray-400/10 border-gray-400/30' };
                  
                  return (
                    <Card key={doc._id} className="flex items-center justify-between p-4 hover:border-[#8b5cf6]/50 hover:shadow-lg transition-all cursor-pointer group" onClick={() => navigate('/documents')}>
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#27272a] rounded-lg group-hover:bg-[#8b5cf6]/20 transition-colors">
                          <FileText className="h-6 w-6 text-[#a1a1aa] group-hover:text-[#8b5cf6]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-lg text-white group-hover:text-[#8b5cf6] transition-colors">{doc.name}</h4>
                          <p className="text-sm text-[#a1a1aa]">{new Date(doc.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium border ${statusUI.color} ${statusUI.bg}`}>
                        <statusUI.icon className="h-4 w-4" />
                        {statusUI.label}
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-xl font-semibold mb-4 text-white">Quick Stats</h3>
            <div className="space-y-6">
              <div>
                <p className="text-[#a1a1aa] mb-1">Documents Analyzed</p>
                <p className="text-4xl font-bold text-white">{stats.analyzed}</p>
              </div>
              <div>
                <p className="text-[#a1a1aa] mb-1">Risks Identified</p>
                <p className="text-4xl font-bold text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.3)]">{stats.risksIdentified}</p>
              </div>
              <div>
                <p className="text-[#a1a1aa] mb-1">Time Saved</p>
                <p className="text-4xl font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">{stats.timeSaved} hrs</p>
              </div>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-[#8b5cf6]/20 to-transparent border-[#8b5cf6]/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-[#8b5cf6]/30 rounded-full blur-2xl"></div>
            <h3 className="text-xl font-semibold mb-2 text-white relative z-10">Upgrade to Pro</h3>
            <p className="text-[#a1a1aa] mb-6 relative z-10">Get unlimited document analysis and priority AI support.</p>
            <Button variant="primary" className="w-full relative z-10" onClick={() => navigate('/settings', { state: { activeTab: 'billing' } })}>View Plans</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
