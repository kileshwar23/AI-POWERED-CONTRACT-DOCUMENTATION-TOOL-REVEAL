import { apiClient } from './apiClient';

export const adminService = {
  // 1. Dashboard
  getDashboardStats: async () => {
    const response = await apiClient.get('/admin/dashboard');
    return response.data;
  },

  // 2. All Users
  getAllUsers: async () => {
    const response = await apiClient.get('/admin/users');
    return response.data;
  },

  // 3. Block User
  blockUser: async (userId) => {
    const response = await apiClient.put(`/admin/users/${userId}/block`);
    return response.data;
  },

  // 4. Delete User
  deleteUser: async (userId) => {
    const response = await apiClient.delete(`/admin/users/${userId}`);
    return response.data;
  },

  // 5. Analytics
  getAnalytics: async () => {
    const response = await apiClient.get('/admin/analytics');
    return response.data;
  },

  // 6. Storage Usage
  getStorageUsage: async () => {
    const response = await apiClient.get('/admin/storage');
    return response.data;
  },

  // 7. Subscription
  getSubscriptionDetails: async () => {
    const response = await apiClient.get('/admin/subscription');
    return response.data;
  },

  // 8. System Logs
  getSystemLogs: async () => {
    const response = await apiClient.get('/admin/logs');
    return response.data;
  }
};
