const express = require('express');
const router = express.Router();
const { searchDocuments, searchClauses, searchRisks, filterByDate, filterByRiskLevel } = require('../controllers/searchController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/documents', protect, searchDocuments);
router.get('/clauses', protect, searchClauses);
router.get('/risks', protect, searchRisks);
router.get('/filter-date', protect, filterByDate);
router.get('/filter-risk', protect, filterByRiskLevel);

module.exports = router;
