const express = require('express');
const router = express.Router();
const { generatePDFReport, exportWord, exportJSON, shareReport, printReport, downloadAnalysis } = require('../controllers/reportController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/pdf/:id', protect, generatePDFReport);
router.post('/word/:id', protect, exportWord);
router.post('/json/:id', protect, exportJSON);
router.post('/share/:id', protect, shareReport);
router.get('/print/:id', protect, printReport);
router.get('/download-analysis/:id', protect, downloadAnalysis);

module.exports = router;
