import apiClient from './apiClient';

export const signatureService = {
  // Request Signature
  requestSignature: async (docId, signers) => {
    const response = await apiClient.post(`/signatures/request/${docId}`, { signers });
    return response.data;
  },

  // Sign Document
  signDocument: async (docId) => {
    const response = await apiClient.post(`/signatures/sign/${docId}`);
    return response.data;
  },

  // Get Signature Status
  getSignatureStatus: async (docId) => {
    const response = await apiClient.get(`/signatures/${docId}/status`);
    return response.data;
  },

  // Generate Certificate
  generateCertificate: async (docId) => {
    const response = await apiClient.get(`/signatures/${docId}/certificate`);
    return response.data;
  }
};
