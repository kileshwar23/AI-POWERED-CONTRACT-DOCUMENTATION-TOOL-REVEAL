const express = require('express');
const router = express.Router();
const { createClause, getClauses, updateClause, deleteClause, compareClause } = require('../controllers/clauseLibraryController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.post('/', protect, admin, createClause); // Assuming only admins can add to library
router.get('/', protect, getClauses);
router.put('/:id', protect, admin, updateClause);
router.delete('/:id', protect, admin, deleteClause);
router.post('/compare', protect, compareClause);

module.exports = router;
