const User = require('../models/User');
const Document = require('../models/Document');
const Notification = require('../models/Notification');

// 1. GET /dashboard — real counts from DB
const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalDocuments, analyzedDocs, archivedDocs] = await Promise.all([
      User.countDocuments(),
      Document.countDocuments(),
      Document.countDocuments({ status: 'ANALYZED' }),
      Document.countDocuments({ status: 'ARCHIVED' }),
    ]);

    res.json({
      totalUsers,
      totalDocuments,
      analyzedDocuments: analyzedDocs,
      archivedDocuments: archivedDocs,
      pendingDocuments: totalDocuments - analyzedDocs - archivedDocs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. GET /users — list all users (exclude passwords)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ count: users.length, users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /documents — list ALL documents across all users (admin only)
const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find()
      .populate('uploaderId', 'name email')
      .sort({ createdAt: -1 });
    res.json({ count: documents.length, documents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. PUT /users/:id/block — toggle isBlocked flag
const blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Prevent admin from blocking themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot block yourself' });
    }

    // Add isBlocked field dynamically — extend User model if needed
    const isCurrentlyBlocked = user.isBlocked || false;
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: !isCurrentlyBlocked },
      { new: true }
    ).select('-password');

    res.json({
      message: `User ${updated.isBlocked ? 'blocked' : 'unblocked'} successfully`,
      user: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. DELETE /users/:id — delete user and their documents
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot delete yourself' });
    }

    await Promise.all([
      User.findByIdAndDelete(req.params.id),
      Document.deleteMany({ uploaderId: req.params.id }),
      Notification.deleteMany({ userId: req.params.id }),
    ]);

    res.json({ message: 'User and associated data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. GET /analytics — usage analytics from DB
const getAnalytics = async (req, res) => {
  try {
    const [totalUsers, totalDocuments, analyzedDocs, totalNotifications] = await Promise.all([
      User.countDocuments(),
      Document.countDocuments(),
      Document.countDocuments({ status: 'ANALYZED' }),
      Notification.countDocuments(),
    ]);

    // Documents uploaded per status
    const statusBreakdown = await Document.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Average risk score of analyzed docs
    const riskData = await Document.aggregate([
      { $match: { status: 'ANALYZED' } },
      { $group: { _id: null, avgRisk: { $avg: '$riskScore' }, maxRisk: { $max: '$riskScore' }, minRisk: { $min: '$riskScore' } } },
    ]);

    res.json({
      totalUsers,
      totalDocuments,
      analyzedDocuments: analyzedDocs,
      totalNotifications,
      documentStatusBreakdown: statusBreakdown,
      riskScoreStats: riskData[0] || { avgRisk: 0, maxRisk: 0, minRisk: 0 },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. GET /storage — summarize uploaded file counts
const getStorageUsage = async (req, res) => {
  try {
    const totalDocuments = await Document.countDocuments();
    // Real storage size requires reading file system or storing file size in DB
    res.json({
      totalDocuments,
      estimatedStorageMB: totalDocuments * 0.5, // rough estimate — store actual size in Document model for precision
      note: 'Store file size in Document model for precise storage reporting.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 7. GET /subscription — placeholder (integrate with Stripe/payment provider)
const getSubscriptionDetails = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({
      plan: 'Free Tier',
      totalUsers,
      maxUsers: 50,
      maxDocumentsPerUser: 20,
      note: 'Connect a payment provider (e.g. Stripe) for real subscription management.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 8. GET /logs — recent activity from notifications and document updates
const getSystemLogs = async (req, res) => {
  try {
    const recentNotifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('userId', 'name email')
      .populate('documentId', 'name');

    const logs = recentNotifications.map(n => ({
      type: n.type,
      message: n.content,
      user: n.userId ? { id: n.userId._id, name: n.userId.name } : null,
      document: n.documentId ? { id: n.documentId._id, name: n.documentId.name } : null,
      timestamp: n.createdAt,
    }));

    res.json({ count: logs.length, logs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats, getAllUsers, getAllDocuments, blockUser, deleteUser, getAnalytics, getStorageUsage, getSubscriptionDetails, getSystemLogs };
