import { apiClient } from './apiClient';

export const searchService = {
  // 1. Search Documents
  searchDocuments: async (query) => {
    const response = await apiClient.get('/search/documents', { params: { query } });
    return response.data;
  },

  // 2. Search Clauses
  searchClauses: async (query) => {
    const response = await apiClient.get('/search/clauses', { params: { query } });
    return response.data;
  },

  // 3. Search Risks
  searchRisks: async (query) => {
    const response = await apiClient.get('/search/risks', { params: { query } });
    return response.data;
  },

  // 4. Filter by Date
  filterByDate: async (startDate, endDate) => {
    const response = await apiClient.get('/search/filter-date', { 
      params: { startDate, endDate } 
    });
    return response.data;
  },

  // 5. Filter by Risk Level
  filterByRiskLevel: async (riskLevel) => {
    const response = await apiClient.get('/search/filter-risk', { 
      params: { level: riskLevel } 
    });
    return response.data;
  }
};
