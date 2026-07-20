const express = require('express');
const router = express.Router();
const { analyzeContract, generateSummary, extractClauses, detectRisks, complianceCheck, getRiskScore, simplifyLanguage, detectMissingClauses, suggestImprovements, detectDeadlines, setupRenewalReminder, compareContracts, suggestRedline } = require('../controllers/aiController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/analyze/:id', protect, analyzeContract);
router.post('/summary/:id', protect, generateSummary);
router.get('/clauses/:id', protect, extractClauses);
router.get('/risks/:id', protect, detectRisks);
router.post('/compliance/:id', protect, complianceCheck);
router.get('/risk-score/:id', protect, getRiskScore);
router.post('/simplify', protect, simplifyLanguage);
router.get('/missing-clauses/:id', protect, detectMissingClauses);
router.get('/improvements/:id', protect, suggestImprovements);
router.get('/deadlines/:id', protect, detectDeadlines);
router.post('/renewals/:id', protect, setupRenewalReminder);
router.post('/suggest-redline/:id', protect, suggestRedline);
router.post('/compare', protect, compareContracts);

module.exports = router;
