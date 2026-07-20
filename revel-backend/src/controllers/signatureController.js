const Document = require('../models/Document');

// 1. Request Signature
const requestSignature = async (req, res) => {
  try {
    const document = await Document.findById(req.params.docId);
    if (!document) return res.status(404).json({ message: 'Document not found' });

    if (document.workflowStatus !== 'APPROVED') {
      return res.status(400).json({ message: 'Document must be approved before requesting signatures' });
    }

    const { signers } = req.body;
    if (!signers || signers.length === 0) {
      return res.status(400).json({ message: 'At least one signer is required' });
    }

    document.workflowStatus = 'OUT_FOR_SIGNATURE';
    document.signers = signers;
    await document.save();

    res.json({ message: 'Document sent for signature', document });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Sign Document (Mock)
const signDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.docId);
    if (!document) return res.status(404).json({ message: 'Document not found' });

    if (document.workflowStatus !== 'OUT_FOR_SIGNATURE') {
      return res.status(400).json({ message: 'Document is not out for signature' });
    }

    if (!document.signers.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to sign this document' });
    }

    // Mocking logic: If the last signer signs, mark as EXECUTED.
    // We'll just mark it executed for now.
    document.workflowStatus = 'EXECUTED';
    await document.save();

    res.json({ message: 'Document signed successfully', document });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Get Signature Status
const getSignatureStatus = async (req, res) => {
  try {
    const document = await Document.findById(req.params.docId).populate('signers', 'name email');
    if (!document) return res.status(404).json({ message: 'Document not found' });

    res.json({
      workflowStatus: document.workflowStatus,
      signers: document.signers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Generate Certificate
const generateCertificate = async (req, res) => {
  try {
    const document = await Document.findById(req.params.docId);
    if (!document) return res.status(404).json({ message: 'Document not found' });

    if (document.workflowStatus !== 'EXECUTED') {
      return res.status(400).json({ message: 'Document is not fully executed yet' });
    }

    // Mock certificate response
    res.json({
      message: 'Certificate generated successfully',
      certificateUrl: `/api/v1/signatures/${document._id}/certificate/download`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { requestSignature, signDocument, getSignatureStatus, generateCertificate };
