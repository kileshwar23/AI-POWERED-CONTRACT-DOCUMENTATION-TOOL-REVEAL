import apiClient from './apiClient';

export const auditService = {
  // Get document audit history
  getDocumentAudit: async (documentId) => {
    const response = await apiClient.get(`/audit/document/${documentId}`);
    return response.data;
  },

  // Get user activity log
  getUserAudit: async (userId) => {
    const response = await apiClient.get(`/audit/user/${userId}`);
    return response.data;
  },

  // Get organization audit log
  getOrganizationAudit: async () => {
    const response = await apiClient.get('/audit/organization');
    return response.data;
  },

  // Export audit log to CSV
  exportAudit: async () => {
    const response = await apiClient.post('/audit/export', {}, { responseType: 'blob' });
    return response.data;
  }
};
