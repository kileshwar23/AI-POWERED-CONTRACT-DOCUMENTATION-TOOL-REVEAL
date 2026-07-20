const mongoose = require('mongoose');

const clauseLibrarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // e.g., 'Confidentiality', 'Liability', 'Termination'
  standardText: { type: String, required: true },
  alternativeText: { type: String }, // Optional alternative acceptable text
  riskLevel: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'LOW' },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }, // Optional, to tie to a specific org
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('ClauseLibrary', clauseLibrarySchema);
