const Document = require('../models/Document');
const User = require('../models/User');

// 1. Start Workflow (Send for review)
const startWorkflow = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.docId, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    if (document.workflowStatus !== 'DRAFT') {
      return res.status(400).json({ message: 'Document is already in a workflow' });
    }

    const { reviewers } = req.body;
    if (!reviewers || reviewers.length === 0) {
      return res.status(400).json({ message: 'At least one reviewer is required' });
    }

    document.workflowStatus = 'PENDING_REVIEW';
    document.reviewers = reviewers; // Should validate if these are valid user IDs
    await document.save();

    res.json({ message: 'Workflow started', document });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Approve Document
const approveDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.docId);
    if (!document) return res.status(404).json({ message: 'Document not found' });

    // Check if user is a reviewer
    if (!document.reviewers.includes(req.user._id) && req.user.role !== 'ORG_ADMIN') {
      return res.status(403).json({ message: 'Not authorized to approve this document' });
    }

    if (document.workflowStatus !== 'PENDING_REVIEW') {
      return res.status(400).json({ message: 'Document is not pending review' });
    }

    document.workflowStatus = 'APPROVED';
    await document.save();

    res.json({ message: 'Document approved', document });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Reject Document
const rejectDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.docId);
    if (!document) return res.status(404).json({ message: 'Document not found' });

    // Check if user is a reviewer
    if (!document.reviewers.includes(req.user._id) && req.user.role !== 'ORG_ADMIN') {
      return res.status(403).json({ message: 'Not authorized to reject this document' });
    }

    if (document.workflowStatus !== 'PENDING_REVIEW') {
      return res.status(400).json({ message: 'Document is not pending review' });
    }

    document.workflowStatus = 'REJECTED';
    await document.save();

    res.json({ message: 'Document rejected', document });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Get Workflow Status
const getWorkflowStatus = async (req, res) => {
  try {
    const document = await Document.findById(req.params.docId).populate('reviewers', 'name email').populate('signers', 'name email');
    if (!document) return res.status(404).json({ message: 'Document not found' });

    res.json({
      workflowStatus: document.workflowStatus,
      reviewers: document.reviewers,
      signers: document.signers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { startWorkflow, approveDocument, rejectDocument, getWorkflowStatus };
