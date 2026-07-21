const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['USER', 'ADMIN', 'OWNER', 'UPLOADER', 'REVIEWER', 'ORG_ADMIN', 'SYSTEM_ADMIN'], default: 'UPLOADER' },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  profilePicture: { type: String, default: '' },
  phone: { type: String, default: '' },
  bio: { type: String, default: '' },
  isBlocked: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
