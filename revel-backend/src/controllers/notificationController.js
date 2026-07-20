const Notification = require('../models/Notification');
const Document = require('../models/Document');

// 1. POST /email — create an ALERT notification (email delivery would need nodemailer)
const sendEmailNotification = async (req, res) => {
  try {
    const { content, documentId } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const notification = await Notification.create({
      userId: req.user._id,
      documentId: documentId || null,
      content: content.trim(),
      type: 'ALERT',
    });

    // TODO: plug in nodemailer here to send actual email to req.user.email
    res.status(201).json({ message: 'Notification created', notification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. POST /deadline — set a deadline REMINDER
const setDeadlineReminder = async (req, res) => {
  try {
    const { documentId, deadline, content } = req.body;
    if (!documentId || !deadline) {
      return res.status(400).json({ message: 'documentId and deadline are required' });
    }

    const document = await Document.findOne({ _id: documentId, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const notification = await Notification.create({
      userId: req.user._id,
      documentId,
      content: content || `Deadline reminder for "${document.name}" on ${deadline}`,
      type: 'REMINDER',
    });

    res.status(201).json({ message: 'Deadline reminder set', deadline, notification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. POST /renewal — set a renewal REMINDER
const setRenewalAlert = async (req, res) => {
  try {
    const { documentId, renewalDate, content } = req.body;
    if (!documentId || !renewalDate) {
      return res.status(400).json({ message: 'documentId and renewalDate are required' });
    }

    const document = await Document.findOne({ _id: documentId, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const notification = await Notification.create({
      userId: req.user._id,
      documentId,
      content: content || `Renewal alert for "${document.name}" on ${renewalDate}`,
      type: 'REMINDER',
    });

    res.status(201).json({ message: 'Renewal alert set', renewalDate, notification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. POST /analysis-complete/:id
const notifyAnalysisComplete = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const notification = await Notification.create({
      userId: req.user._id,
      documentId: document._id,
      content: `Analysis complete for "${document.name}". Risk score: ${document.riskScore}.`,
      type: 'ANALYSIS_COMPLETE',
    });

    res.status(201).json({ message: 'Analysis complete notification sent', notification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. GET / — fetch all notifications for current user
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('documentId', 'name status');
    res.json({ count: notifications.length, notifications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. PUT /:id/read — mark notification as read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { isRead: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 7. PUT /mark-all-read — mark all as read
const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ userId: req.user._id, isRead: false }, { isRead: true });
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendEmailNotification, setDeadlineReminder, setRenewalAlert,
  notifyAnalysisComplete, getNotifications, markAsRead, markAllAsRead,
};
