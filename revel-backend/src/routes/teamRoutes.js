const express = require('express');
const router = express.Router();
const { inviteMember, removeMember, assignReviewer, addComment, getActivityLogs, getMyTeam, updateOrganizationSettings } = require('../controllers/teamController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/my-team', protect, getMyTeam);
router.post('/invite', protect, inviteMember);
router.delete('/members/:id', protect, removeMember);
router.post('/assign-reviewer', protect, assignReviewer);
router.post('/comments/:id', protect, addComment);
router.get('/activity-logs', protect, getActivityLogs);
router.put('/organization/settings', protect, updateOrganizationSettings);

module.exports = router;
