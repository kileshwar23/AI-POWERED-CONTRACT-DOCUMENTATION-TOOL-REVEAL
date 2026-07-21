const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadDocument, uploadNewVersion, getDocumentVersions, compareDocuments, getDocument, getAllDocuments, deleteDocument, renameDocument, downloadDocument, favoriteDocument, archiveDocument, restoreDocument, getDocumentStatistics, approveDocument, rejectDocument } = require('../controllers/documentController');
const { protect } = require('../middlewares/authMiddleware');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', protect, upload.single('file'), uploadDocument);
router.post('/:id/versions', protect, upload.single('file'), uploadNewVersion);
router.get('/:id/versions', protect, getDocumentVersions);
router.get('/compare/:id1/:id2', protect, compareDocuments);
router.get('/', protect, getAllDocuments);
router.get('/statistics', protect, getDocumentStatistics);
router.get('/:id', protect, getDocument);
router.delete('/:id', protect, deleteDocument);
router.put('/:id/rename', protect, renameDocument);
router.get('/:id/download', protect, downloadDocument);
router.post('/:id/favorite', protect, favoriteDocument);
router.post('/:id/archive', protect, archiveDocument);
router.post('/:id/restore', protect, restoreDocument);
router.post('/:id/approve', protect, approveDocument);
router.post('/:id/reject', protect, rejectDocument);

module.exports = router;
