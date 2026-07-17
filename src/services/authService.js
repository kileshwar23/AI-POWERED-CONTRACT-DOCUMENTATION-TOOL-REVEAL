import { apiClient } from './apiClient';

export const authService = {
  // 1. POST /register
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  // 2. POST /login
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response.data;
  },

  // 3. POST /logout
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return response.data;
  },

  // 4. POST /refresh-token (Handled largely by interceptor, but exposed here if needed)
  refreshToken: async (refreshToken) => {
    const response = await apiClient.post('/auth/refresh-token', { refreshToken });
    return response.data;
  },

  // 5. GET /profile
  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  // 6. PUT /profile
  updateProfile: async (profileData) => {
    const response = await apiClient.put('/auth/profile', profileData);
    return response.data;
  },

  // 7. PUT /change-password
  changePassword: async (passwordData) => {
    const response = await apiClient.put('/auth/change-password', passwordData);
    return response.data;
  },

  // 8. DELETE /account
  deleteAccount: async () => {
    const response = await apiClient.delete('/auth/account');
    return response.data;
  }
};
