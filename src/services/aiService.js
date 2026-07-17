import { apiClient } from './apiClient';

export const aiService = {
  // 1. Analyze Contract
  analyzeContract: async (documentId) => {
    const response = await apiClient.post(`/ai/analyze/${documentId}`);
    return response.data;
  },

  // 2. Generate Summary
  generateSummary: async (documentId) => {
    const response = await apiClient.post(`/ai/summary/${documentId}`);
    return response.data;
  },

  // 3. Extract Clauses
  extractClauses: async (documentId) => {
    const response = await apiClient.get(`/ai/clauses/${documentId}`);
    return response.data;
  },

  // 4. Detect Risks
  detectRisks: async (documentId) => {
    const response = await apiClient.get(`/ai/risks/${documentId}`);
    return response.data;
  },

  // 5. Compliance Check
  complianceCheck: async (documentId, standard) => {
    const response = await apiClient.post(`/ai/compliance/${documentId}`, { standard });
    return response.data;
  },

  // 6. Risk Score
  getRiskScore: async (documentId) => {
    const response = await apiClient.get(`/ai/risk-score/${documentId}`);
    return response.data;
  },

  // 7. Simplify Legal Language
  simplifyLanguage: async (text) => {
    const response = await apiClient.post(`/ai/simplify`, { text });
    return response.data;
  },

  // 8. Missing Clauses
  detectMissingClauses: async (documentId) => {
    const response = await apiClient.get(`/ai/missing-clauses/${documentId}`);
    return response.data;
  },

  // 9. Suggest Improvements
  suggestImprovements: async (documentId) => {
    const response = await apiClient.get(`/ai/improvements/${documentId}`);
    return response.data;
  },

  // 10. Detect Deadlines
  detectDeadlines: async (documentId) => {
    const response = await apiClient.get(`/ai/deadlines/${documentId}`);
    return response.data;
  },

  // 11. Renewal Reminder
  setupRenewalReminder: async (documentId, dates) => {
    const response = await apiClient.post(`/ai/renewals/${documentId}`, { dates });
    return response.data;
  },

  // 12. Compare Contracts
  compareContracts: async (docId1, docId2) => {
    const response = await apiClient.post(`/ai/compare`, { docId1, docId2 });
    return response.data;
  }
};
