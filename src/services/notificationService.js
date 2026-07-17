import { apiClient } from './apiClient';

export const notificationService = {
  // 1. Email Notification
  sendEmailNotification: async (userId, content) => {
    const response = await apiClient.post('/notifications/email', { userId, content });
    return response.data;
  },

  // 2. Deadline Reminder
  setDeadlineReminder: async (documentId, date) => {
    const response = await apiClient.post('/notifications/deadline', { documentId, date });
    return response.data;
  },

  // 3. Renewal Alert
  setRenewalAlert: async (documentId, date) => {
    const response = await apiClient.post('/notifications/renewal', { documentId, date });
    return response.data;
  },

  // 4. AI Analysis Complete
  notifyAnalysisComplete: async (documentId) => {
    const response = await apiClient.post(`/notifications/analysis-complete/${documentId}`);
    return response.data;
  }
};
