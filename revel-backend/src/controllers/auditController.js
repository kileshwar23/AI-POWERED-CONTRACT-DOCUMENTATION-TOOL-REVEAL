const AuditLog = require('../models/AuditLog');
const Document = require('../models/Document');

// Helper to create an audit log
const createLog = async (action, userId, documentId, details, ipAddress) => {
  try {
    await AuditLog.create({ action, userId, documentId, details, ipAddress });
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
};

// 1. Get Document Audit History
const getDocumentAudit = async (req, res) => {
  try {
    const documentId = req.params.id;
    const logs = await AuditLog.find({ documentId }).populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Get User Activity Log
const getUserAudit = async (req, res) => {
  try {
    const userId = req.params.id;
    // In real app, check if req.user has permission to view this
    const logs = await AuditLog.find({ userId }).populate('documentId', 'name').sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Get Organization Audit Log
const getOrganizationAudit = async (req, res) => {
  try {
    // Should verify req.user is ORG_ADMIN
    const logs = await AuditLog.find().populate('userId', 'name email').populate('documentId', 'name').sort({ createdAt: -1 }).limit(100);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Export Audit Log to CSV (Mock)
const exportAudit = async (req, res) => {
  try {
    // Generate CSV data from logs
    // Mock response for now
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=\"audit_logs.csv\"');
    res.send('Date,User,Action,Document,Details\n2026-07-19,admin@revel.ai,APPROVED,Contract.pdf,Approved by reviewer');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createLog, getDocumentAudit, getUserAudit, getOrganizationAudit, exportAudit };
