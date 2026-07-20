const express = require('express');
const router = express.Router();
const { createThread, getThreads, replyToThread, resolveThread, applyRedline } = require('../controllers/threadController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createThread);
router.get('/document/:documentId', protect, getThreads);
router.post('/:id/reply', protect, replyToThread);
router.put('/:id/resolve', protect, resolveThread);
router.post('/:id/apply', protect, applyRedline);

module.exports = router;
