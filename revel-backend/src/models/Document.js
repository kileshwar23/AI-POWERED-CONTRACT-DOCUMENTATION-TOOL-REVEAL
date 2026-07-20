const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fileUrl: { type: String, required: true },
  uploaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  riskScore: { type: Number, default: 0 },
  status: { type: String, enum: ['PENDING', 'ANALYZED', 'ARCHIVED'], default: 'PENDING' },
  workflowStatus: { type: String, enum: ['DRAFT', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'OUT_FOR_SIGNATURE', 'EXECUTED'], default: 'DRAFT' },
  versionNumber: { type: Number, default: 1 },
  parentDocumentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', default: null },
  isLatestVersion: { type: Boolean, default: true },
  reviewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  signers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  extractedClauses: [{
    title: String,
    content: String,
    type: String, // e.g., 'RISK', 'INFO'
    riskScore: { type: Number, default: 0 },
    suggestedRedline: { type: String, default: '' },
  }],
  isFavorite: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
