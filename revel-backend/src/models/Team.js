const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  settings: {
    allowPublicSharing: { type: Boolean, default: false },
    defaultRiskTolerance: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'MEDIUM' }
  },
  members: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['ORG_ADMIN', 'REVIEWER', 'UPLOADER', 'VIEWER'], default: 'UPLOADER' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
