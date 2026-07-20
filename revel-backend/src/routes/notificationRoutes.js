const express = require('express');
const router = express.Router();
const {
  sendEmailNotification, setDeadlineReminder, setRenewalAlert,
  notifyAnalysisComplete, getNotifications, markAsRead, markAllAsRead,
} = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, getNotifications);
router.post('/email', protect, sendEmailNotification);
router.post('/deadline', protect, setDeadlineReminder);
router.post('/renewal', protect, setRenewalAlert);
router.post('/analysis-complete/:id', protect, notifyAnalysisComplete);
router.put('/mark-all-read', protect, markAllAsRead);
router.put('/:id/read', protect, markAsRead);

module.exports = router;
