import apiClient from './apiClient';

export const threadService = {
  // Create a Thread
  createThread: async (data) => {
    const response = await apiClient.post('/threads', data);
    return response.data;
  },

  // Get Threads for Document
  getThreads: async (documentId) => {
    const response = await apiClient.get(`/threads/document/${documentId}`);
    return response.data;
  },

  // Reply to Thread
  replyToThread: async (threadId, text) => {
    const response = await apiClient.post(`/threads/${threadId}/reply`, { text });
    return response.data;
  },

  // Resolve Thread
  resolveThread: async (threadId) => {
    const response = await apiClient.put(`/threads/${threadId}/resolve`);
    return response.data;
  },

  // Apply Redline
  applyRedline: async (threadId) => {
    const response = await apiClient.post(`/threads/${threadId}/apply`);
    return response.data;
  }
};
