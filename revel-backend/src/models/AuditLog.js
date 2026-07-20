const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true }, // e.g., 'UPLOADED', 'APPROVED', 'SIGNED', 'VIEWED'
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
  details: { type: String }, // Extra info like 'Changed status to APPROVED'
  ipAddress: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditLogSchema);
