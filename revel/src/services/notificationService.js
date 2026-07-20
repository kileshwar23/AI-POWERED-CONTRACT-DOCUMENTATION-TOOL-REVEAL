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
  },

  // 5. Get Notifications
  getNotifications: async () => {
    const response = await apiClient.get('/notifications');
    return response.data;
  },

  // 6. Mark As Read
  markAsRead: async (notificationId) => {
    const response = await apiClient.put(`/notifications/${notificationId}/read`);
    return response.data;
  },

  // 7. Mark All As Read
  markAllAsRead: async () => {
    const response = await apiClient.put('/notifications/mark-all-read');
    return response.data;
  }
};
