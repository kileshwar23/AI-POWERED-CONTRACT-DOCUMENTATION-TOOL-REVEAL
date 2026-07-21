import { apiClient } from './apiClient';

export const documentService = {
  // 1. Upload Document
  uploadDocument: async (fileData) => {
    const formData = new FormData();
    formData.append('file', fileData);
    const response = await apiClient.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // 2. Get Document
  getDocument: async (documentId) => {
    const response = await apiClient.get(`/documents/${documentId}`);
    return response.data;
  },

  // 3. Get All Documents
  getAllDocuments: async () => {
    const response = await apiClient.get('/documents');
    return response.data;
  },

  // 4. Delete Document
  deleteDocument: async (documentId) => {
    const response = await apiClient.delete(`/documents/${documentId}`);
    return response.data;
  },

  // 5. Rename Document
  renameDocument: async (documentId, newName) => {
    const response = await apiClient.put(`/documents/${documentId}/rename`, { name: newName });
    return response.data;
  },

  // 6. Download Document
  downloadDocument: async (documentId) => {
    const response = await apiClient.get(`/documents/${documentId}/download`, {
      responseType: 'blob'
    });
    return response.data;
  },

  // 7. Favorite Document
  favoriteDocument: async (documentId) => {
    const response = await apiClient.post(`/documents/${documentId}/favorite`);
    return response.data;
  },

  // 8. Archive Document
  archiveDocument: async (documentId) => {
    const response = await apiClient.post(`/documents/${documentId}/archive`);
    return response.data;
  },

  // 9. Restore Document
  restoreDocument: async (documentId) => {
    const response = await apiClient.post(`/documents/${documentId}/restore`);
    return response.data;
  },

  // 10. Document Statistics
  getDocumentStatistics: async () => {
    const response = await apiClient.get('/documents/statistics');
    return response.data;
  },

  // 11. Upload New Version
  uploadNewVersion: async (documentId, fileData) => {
    const formData = new FormData();
    formData.append('file', fileData);
    const response = await apiClient.post(`/documents/${documentId}/versions`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // 12. Get Document Versions
  getDocumentVersions: async (documentId) => {
    const response = await apiClient.get(`/documents/${documentId}/versions`);
    return response.data;
  },

  // 13. Compare Documents
  compareDocuments: async (id1, id2) => {
    const response = await apiClient.get(`/documents/compare/${id1}/${id2}`);
    return response.data;
  },

  // 14. Get All Admin Documents
  getAllAdminDocuments: async () => {
    const response = await apiClient.get('/admin/documents');
    return response.data;
  },

  // 15. Approve Document
  approveDocument: async (documentId) => {
    const response = await apiClient.post(`/documents/${documentId}/approve`);
    return response.data;
  },

  // 16. Reject Document
  rejectDocument: async (documentId) => {
    const response = await apiClient.post(`/documents/${documentId}/reject`);
    return response.data;
  }
};
