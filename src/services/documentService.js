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
  }
};
