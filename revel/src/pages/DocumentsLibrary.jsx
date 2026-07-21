import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, FileText, AlertTriangle, CheckCircle, Clock, MoreVertical, Download, Trash2, UploadCloud, Loader2, Archive, Zap, XCircle, Check, X } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { documentService } from '../services/documentService';
import { aiService } from '../services/aiService';
import { useAuth } from '../context/AuthContext';

export const DocumentsLibrary = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [analyzingId, setAnalyzingId] = useState(null);
  const [analyzeError, setAnalyzeError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const adminRoles = ['ADMIN', 'OWNER', 'ORG_ADMIN', 'SYSTEM_ADMIN'];
      if (user?.role && adminRoles.includes(user.role)) {
        const data = await documentService.getAllAdminDocuments();
        setDocuments(data?.documents || []);
      } else {
        const data = await documentService.getAllDocuments();
        setDocuments(data || []);
      }
    } catch (error) {
      console.error("Failed to fetch documents", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await documentService.uploadDocument(file);
      await fetchDocuments(); // refresh list
    } catch (error) {
      console.error("Failed to upload document", error);
      alert("Failed to upload. Make sure you are logged in.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDownload = async (id, name, e) => {
    e.stopPropagation();
    try {
      const blob = await documentService.downloadDocument(id);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name || 'document');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Failed to download document", error);
      alert("Failed to download document.");
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if(window.confirm('Are you sure you want to delete this document?')) {
      try {
        await documentService.deleteDocument(id);
        setDocuments(docs => docs.filter(d => d._id !== id));
      } catch (error) {
        console.error("Failed to delete document", error);
      }
    }
  };

  const handleAnalyze = async (id, e) => {
    e.stopPropagation();
    setAnalyzingId(id);
    setAnalyzeError(null);
    try {
      await aiService.analyzeContract(id);
      await fetchDocuments();
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Analysis failed';
      setAnalyzeError(msg);
      console.error("Failed to analyze", error);
    } finally {
      setAnalyzingId(null);
    }
  };

  const handleApprove = async (id, e) => {
    e.stopPropagation();
    try {
      await documentService.approveDocument(id);
      await fetchDocuments();
    } catch (error) {
      console.error("Failed to approve", error);
    }
  };

  const handleReject = async (id, e) => {
    e.stopPropagation();
    try {
      await documentService.rejectDocument(id);
      await fetchDocuments();
    } catch (error) {
      console.error("Failed to reject", error);
    }
  };

  const getStatusUI = (status) => {
    switch (status) {
      case 'APPROVED':
        return { icon: CheckCircle, label: 'Approved', color: 'text-green-500', bg: 'bg-green-500/10 border-green-500/30' };
      case 'REJECTED':
        return { icon: XCircle, label: 'Rejected', color: 'text-red-500', bg: 'bg-red-500/10 border-red-500/30' };
      case 'ANALYZED':
        return { icon: CheckCircle, label: 'Analyzed', color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/30' };
      case 'ARCHIVED':
        return { icon: Archive, label: 'Archived', color: 'text-gray-400', bg: 'bg-gray-400/10 border-gray-400/30' };
      default:
        return { icon: Clock, label: 'Pending', color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/30' };
    }
  };

  return (
    <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Document Library</h1>
          <p className="text-[#a1a1aa]">Manage and search through all your analyzed contracts.</p>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
        />
        <Button variant="primary" className="whitespace-nowrap gap-2" onClick={handleUploadClick} disabled={uploading}>
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
          {uploading ? 'Uploading...' : 'Upload New'}
        </Button>
      </div>

      {analyzeError && (
        <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-300">Analysis Failed</p>
            <p className="text-xs text-red-400 mt-0.5">{analyzeError}</p>
          </div>
          <button onClick={() => setAnalyzeError(null)} className="ml-auto text-red-400 hover:text-red-200"><X className="h-4 w-4" /></button>
        </div>
      )}

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

        <div className="overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="flex items-center justify-center h-64 text-gray-400 gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-[#8b5cf6]" />
              <span>Loading documents...</span>
            </div>
          ) : documents.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-64 text-gray-400">
               <FileText className="h-12 w-12 text-[rgba(255,255,255,0.1)] mb-4" />
               <p>No documents found.</p>
               <Button variant="ghost" className="mt-4 text-[#8b5cf6]" onClick={handleUploadClick}>Upload your first document</Button>
             </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-[#27272a]/20 border-b border-[rgba(255,255,255,0.05)] text-[#a1a1aa]">
                <tr>
                  <th className="px-6 py-4 font-medium">Document Name</th>
                  <th className="px-6 py-4 font-medium">Date Uploaded</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Risk Score</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                {documents.map((doc) => {
                  const statusUI = getStatusUI(doc.status);
                  return (
                    <tr key={doc._id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#27272a] rounded-lg group-hover:bg-[#8b5cf6]/20 transition-colors border border-[rgba(255,255,255,0.05)] group-hover:border-[#8b5cf6]/30">
                            <FileText className="h-5 w-5 text-[#a1a1aa] group-hover:text-[#8b5cf6]" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-white group-hover:text-[#8b5cf6] transition-colors">{doc.name}</span>
                            {['ADMIN', 'OWNER', 'ORG_ADMIN', 'SYSTEM_ADMIN'].includes(user?.role) && doc.uploaderId && (
                              <span className="text-xs text-gray-500 mt-0.5">by {doc.uploaderId.name || 'Unknown'}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{new Date(doc.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex px-2.5 py-1 rounded-full items-center gap-1.5 text-xs font-medium border ${statusUI.color} ${statusUI.bg}`}>
                          <statusUI.icon className="h-3 w-3" />
                          {statusUI.label}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{doc.riskScore || 0}/100</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {doc.status === 'PENDING' && (
                            <Button variant="primary" className="h-8 px-3 text-xs gap-1.5" onClick={(e) => handleAnalyze(doc._id, e)} disabled={analyzingId === doc._id}>
                              {analyzingId === doc._id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Zap className="h-3.5 w-3.5" />}
                              {analyzingId === doc._id ? 'Analyzing...' : 'Analyze'}
                            </Button>
                          )}
                          {doc.status === 'ANALYZED' && ['ADMIN', 'OWNER', 'ORG_ADMIN', 'SYSTEM_ADMIN'].includes(user?.role) && (
                            <>
                              <Button variant="ghost" className="h-8 px-2 text-green-500 hover:text-green-400 hover:bg-green-500/10" onClick={(e) => handleApprove(doc._id, e)} title="Approve">
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" className="h-8 px-2 text-red-500 hover:text-red-400 hover:bg-red-500/10" onClick={(e) => handleReject(doc._id, e)} title="Reject">
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button variant="secondary" className="h-8 px-3 text-gray-300 hover:text-white flex items-center gap-1.5" onClick={(e) => handleDownload(doc._id, doc.name, e)} title="Download">
                            <Download className="h-4 w-4" />
                            <span className="text-xs font-medium">Download</span>
                          </Button>
                          <Button variant="danger" className="h-8 px-3 flex items-center gap-1.5" onClick={(e) => handleDelete(doc._id, e)} title="Delete">
                            <Trash2 className="h-4 w-4" />
                            <span className="text-xs font-medium">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
};
