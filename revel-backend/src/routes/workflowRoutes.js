const express = require('express');
const router = express.Router();
const { startWorkflow, approveDocument, rejectDocument, getWorkflowStatus } = require('../controllers/workflowController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/:docId/start', protect, startWorkflow);
router.post('/:docId/approve', protect, approveDocument);
router.post('/:docId/reject', protect, rejectDocument);
router.get('/:docId/status', protect, getWorkflowStatus);

module.exports = router;
