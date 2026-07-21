const path = require('path');
const fs = require('fs');
const Document = require('../models/Document');

// 1. Upload Document
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const document = await Document.create({
      name: req.file.originalname,
      fileUrl: `/uploads/${req.file.filename}`,
      uploaderId: req.user._id,
      versionNumber: 1,
      isLatestVersion: true
    });
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 1.1 Upload New Version
const uploadNewVersion = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const parentId = req.params.id;
    const parentDoc = await Document.findOne({ _id: parentId, uploaderId: req.user._id });
    
    if (!parentDoc) {
      return res.status(404).json({ message: 'Parent document not found' });
    }

    // Set old versions to not latest
    await Document.updateMany(
      { $or: [{ _id: parentId }, { parentDocumentId: parentId }] },
      { isLatestVersion: false }
    );

    // Get highest version number
    const allVersions = await Document.find({ $or: [{ _id: parentId }, { parentDocumentId: parentId }] }).sort({ versionNumber: -1 });
    const nextVersion = (allVersions[0]?.versionNumber || 1) + 1;

    const document = await Document.create({
      name: req.file.originalname,
      fileUrl: `/uploads/${req.file.filename}`,
      uploaderId: req.user._id,
      versionNumber: nextVersion,
      parentDocumentId: parentId,
      isLatestVersion: true,
      workflowStatus: 'DRAFT'
    });
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 1.2 Get Document Versions
const getDocumentVersions = async (req, res) => {
  try {
    const parentId = req.params.id;
    const versions = await Document.find({ 
      $or: [{ _id: parentId }, { parentDocumentId: parentId }],
      uploaderId: req.user._id
    }).sort({ versionNumber: -1 });
    
    res.json(versions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 1.3 Compare Documents
const compareDocuments = async (req, res) => {
  try {
    const { id1, id2 } = req.params;
    // Mock comparison response
    res.json({
      message: 'Comparison generated successfully (mock)',
      differences: [
        { type: 'ADDED', text: 'Confidentiality clause updated.' },
        { type: 'REMOVED', text: 'Old termination clause.' }
      ]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Get Single Document
const getDocument = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Get All Documents (for current user)
const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ uploaderId: req.user._id }).sort({ createdAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Delete Document
const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    // Remove physical file from disk
    const filePath = path.join(__dirname, '../../', document.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Rename Document
const renameDocument = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }
    const document = await Document.findOneAndUpdate(
      { _id: req.params.id, uploaderId: req.user._id },
      { name: name.trim() },
      { new: true }
    );
    if (!document) return res.status(404).json({ message: 'Document not found' });
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. Download Document — Fix: actually streams the file
const downloadDocument = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const filePath = path.join(__dirname, '../../', document.fileUrl);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found on server' });
    }

    res.setHeader('Content-Disposition', `attachment; filename="${document.name}"`);
    res.sendFile(filePath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 7. Toggle Favorite
const favoriteDocument = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    document.isFavorite = !document.isFavorite;
    await document.save();
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 8. Archive Document
const archiveDocument = async (req, res) => {
  try {
    const document = await Document.findOneAndUpdate(
      { _id: req.params.id, uploaderId: req.user._id },
      { status: 'ARCHIVED' },
      { new: true }
    );
    if (!document) return res.status(404).json({ message: 'Document not found' });
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 9. Restore Document
const restoreDocument = async (req, res) => {
  try {
    const document = await Document.findOneAndUpdate(
      { _id: req.params.id, uploaderId: req.user._id },
      { status: 'PENDING' },
      { new: true }
    );
    if (!document) return res.status(404).json({ message: 'Document not found' });
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 10. Document Statistics
const getDocumentStatistics = async (req, res) => {
  try {
    const userId = req.user._id;
    const adminRoles = ['ADMIN', 'OWNER', 'ORG_ADMIN', 'SYSTEM_ADMIN'];
    const isAdmin = adminRoles.includes(req.user.role);
    
    // If admin, query all documents. Otherwise, only user's documents.
    const query = isAdmin ? {} : { uploaderId: userId };

    const total = await Document.countDocuments(query);
    const archived = await Document.countDocuments({ ...query, status: 'ARCHIVED' });
    const analyzed = await Document.countDocuments({ ...query, status: 'ANALYZED' });
    const pending = await Document.countDocuments({ ...query, status: 'PENDING' });
    const favorites = await Document.countDocuments({ ...query, isFavorite: true });

    // Calculate total risks
    const documents = await Document.find({ ...query, status: 'ANALYZED' });
    let totalRisks = 0;
    documents.forEach(doc => {
      if (doc.extractedClauses && doc.extractedClauses.length > 0) {
        totalRisks += doc.extractedClauses.filter(c => c.type === 'RISK').length;
      } else if (doc.riskScore > 50) {
        totalRisks += 1;
      }
    });

    // Mock time saved: ~3 hours per analyzed document
    const timeSaved = analyzed * 3;

    res.json({ total, archived, analyzed, pending, favorites, risksIdentified: totalRisks, timeSaved });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 11. Approve Document
const approveDocument = async (req, res) => {
  try {
    const adminRoles = ['ADMIN', 'OWNER', 'ORG_ADMIN', 'SYSTEM_ADMIN'];
    if (!adminRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Only admins can approve documents' });
    }
    const document = await Document.findByIdAndUpdate(
      req.params.id,
      { status: 'APPROVED' },
      { new: true }
    );
    if (!document) return res.status(404).json({ message: 'Document not found' });
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 12. Reject Document
const rejectDocument = async (req, res) => {
  try {
    const adminRoles = ['ADMIN', 'OWNER', 'ORG_ADMIN', 'SYSTEM_ADMIN'];
    if (!adminRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Only admins can reject documents' });
    }
    const document = await Document.findByIdAndUpdate(
      req.params.id,
      { status: 'REJECTED' },
      { new: true }
    );
    if (!document) return res.status(404).json({ message: 'Document not found' });
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadDocument, uploadNewVersion, getDocumentVersions, compareDocuments,
  getDocument, getAllDocuments, deleteDocument,
  renameDocument, downloadDocument, favoriteDocument, archiveDocument,
  restoreDocument, getDocumentStatistics, approveDocument, rejectDocument
};
