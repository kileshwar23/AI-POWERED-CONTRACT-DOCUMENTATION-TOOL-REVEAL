const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
  clauseId: { type: mongoose.Schema.Types.ObjectId }, // Can be null if it's a general comment
  clauseText: { type: String }, // The text being commented on
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['COMMENT', 'REDLINE'], default: 'COMMENT' },
  text: { type: String, required: true }, // The comment text or redline suggestion
  status: { type: String, enum: ['OPEN', 'RESOLVED', 'APPLIED'], default: 'OPEN' },
  replies: [{
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Thread', threadSchema);
