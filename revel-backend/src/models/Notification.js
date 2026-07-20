const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
  content: { type: String, required: true },
  type: { type: String, enum: ['ALERT', 'REMINDER', 'ANALYSIS_COMPLETE', 'REVIEW_REQUESTED', 'SIGNATURE_REQUESTED', 'WORKFLOW_APPROVED'], required: true },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
