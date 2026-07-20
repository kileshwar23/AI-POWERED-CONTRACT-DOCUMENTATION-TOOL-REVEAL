const express = require('express');
const router = express.Router();
const { getDocumentAudit, getUserAudit, getOrganizationAudit, exportAudit } = require('../controllers/auditController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.get('/document/:id', protect, getDocumentAudit);
router.get('/user/:id', protect, getUserAudit);
router.get('/organization', protect, admin, getOrganizationAudit); // Assuming ORG_ADMIN acts like admin for now
router.post('/export', protect, admin, exportAudit);

module.exports = router;
