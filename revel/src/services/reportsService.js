import { apiClient } from './apiClient';

export const reportsService = {
  // 1. Generate PDF Report
  generatePDFReport: async (documentId) => {
    const response = await apiClient.post(`/reports/pdf/${documentId}`, null, {
      responseType: 'blob'
    });
    return response.data;
  },

  // 2. Export Word
  exportWord: async (documentId) => {
    const response = await apiClient.post(`/reports/word/${documentId}`, null, {
      responseType: 'blob'
    });
    return response.data;
  },

  // 3. Export JSON
  exportJSON: async (documentId) => {
    const response = await apiClient.post(`/reports/json/${documentId}`);
    return response.data;
  },

  // 4. Share Report
  shareReport: async (documentId, emailAddresses) => {
    const response = await apiClient.post(`/reports/share/${documentId}`, { emails: emailAddresses });
    return response.data;
  },

  // 5. Print Report
  printReport: async (documentId) => {
    const response = await apiClient.get(`/reports/print/${documentId}`);
    return response.data;
  },

  // 6. Download Analysis
  downloadAnalysis: async (documentId) => {
    const response = await apiClient.get(`/reports/download-analysis/${documentId}`, {
      responseType: 'blob'
    });
    return response.data;
  }
};
