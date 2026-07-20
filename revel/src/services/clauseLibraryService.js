import apiClient from './apiClient';

export const clauseLibraryService = {
  // Create a Standard Clause
  createClause: async (data) => {
    const response = await apiClient.post('/clause-library', data);
    return response.data;
  },

  // Get All Standard Clauses
  getClauses: async () => {
    const response = await apiClient.get('/clause-library');
    return response.data;
  },

  // Update Clause
  updateClause: async (id, data) => {
    const response = await apiClient.put(`/clause-library/${id}`, data);
    return response.data;
  },

  // Delete Clause
  deleteClause: async (id) => {
    const response = await apiClient.delete(`/clause-library/${id}`);
    return response.data;
  },

  // Compare Document Clause vs Library Clause
  compareClause: async (documentClauseText, libraryClauseId) => {
    const response = await apiClient.post('/clause-library/compare', { documentClauseText, libraryClauseId });
    return response.data;
  }
};
