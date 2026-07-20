const express = require('express');
const router = express.Router();
const { getDashboardStats, getAllUsers, getAllDocuments, blockUser, deleteUser, getAnalytics, getStorageUsage, getSubscriptionDetails, getSystemLogs } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.get('/dashboard', protect, admin, getDashboardStats);
router.get('/users', protect, admin, getAllUsers);
router.get('/documents', protect, admin, getAllDocuments);
router.put('/users/:id/block', protect, admin, blockUser);
router.delete('/users/:id', protect, admin, deleteUser);
router.get('/analytics', protect, admin, getAnalytics);
router.get('/storage', protect, admin, getStorageUsage);
router.get('/subscription', protect, admin, getSubscriptionDetails);
router.get('/logs', protect, admin, getSystemLogs);

module.exports = router;
