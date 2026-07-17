import { apiClient } from './apiClient';

export const teamService = {
  // 1. Invite Member
  inviteMember: async (email, role) => {
    const response = await apiClient.post('/team/invite', { email, role });
    return response.data;
  },

  // 2. Remove Member
  removeMember: async (userId) => {
    const response = await apiClient.delete(`/team/members/${userId}`);
    return response.data;
  },

  // 3. Assign Reviewer
  assignReviewer: async (documentId, userId) => {
    const response = await apiClient.post(`/team/assign-reviewer`, { documentId, userId });
    return response.data;
  },

  // 4. Add Comment
  addComment: async (documentId, comment) => {
    const response = await apiClient.post(`/team/comments/${documentId}`, { comment });
    return response.data;
  },

  // 5. Activity Logs
  getActivityLogs: async (documentId = null) => {
    const params = documentId ? { documentId } : {};
    const response = await apiClient.get('/team/activity-logs', { params });
    return response.data;
  }
};
