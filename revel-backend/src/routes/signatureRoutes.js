const express = require('express');
const router = express.Router();
const { requestSignature, signDocument, getSignatureStatus, generateCertificate } = require('../controllers/signatureController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/request/:docId', protect, requestSignature);
router.post('/sign/:docId', protect, signDocument);
router.get('/:docId/status', protect, getSignatureStatus);
router.get('/:docId/certificate', protect, generateCertificate);

module.exports = router;
