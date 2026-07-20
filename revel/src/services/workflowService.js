import apiClient from './apiClient';

export const workflowService = {
  // Start Workflow (Send for review)
  startWorkflow: async (docId, reviewers) => {
    const response = await apiClient.post(`/workflow/${docId}/start`, { reviewers });
    return response.data;
  },

  // Approve Document
  approveDocument: async (docId) => {
    const response = await apiClient.post(`/workflow/${docId}/approve`);
    return response.data;
  },

  // Reject Document
  rejectDocument: async (docId) => {
    const response = await apiClient.post(`/workflow/${docId}/reject`);
    return response.data;
  },

  // Get Workflow Status
  getWorkflowStatus: async (docId) => {
    const response = await apiClient.get(`/workflow/${docId}/status`);
    return response.data;
  }
};
