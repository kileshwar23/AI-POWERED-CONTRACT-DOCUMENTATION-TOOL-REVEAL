const Thread = require('../models/Thread');
const Document = require('../models/Document');

// 1. Create a Thread
const createThread = async (req, res) => {
  try {
    const { documentId, clauseId, clauseText, type, text } = req.body;
    
    const document = await Document.findOne({ _id: documentId, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const thread = await Thread.create({
      documentId,
      clauseId,
      clauseText,
      authorId: req.user._id,
      type: type || 'COMMENT',
      text
    });

    res.status(201).json(thread);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Get Threads for Document
const getThreads = async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const threads = await Thread.find({ documentId }).populate('authorId', 'name email').populate('replies.authorId', 'name email');
    res.json(threads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Reply to Thread
const replyToThread = async (req, res) => {
  try {
    const { text } = req.body;
    const thread = await Thread.findById(req.params.id);
    if (!thread) return res.status(404).json({ message: 'Thread not found' });

    thread.replies.push({ authorId: req.user._id, text });
    await thread.save();

    res.json(thread);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Resolve Thread
const resolveThread = async (req, res) => {
  try {
    const thread = await Thread.findByIdAndUpdate(req.params.id, { status: 'RESOLVED' }, { new: true });
    if (!thread) return res.status(404).json({ message: 'Thread not found' });
    res.json(thread);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Apply Redline
const applyRedline = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);
    if (!thread || thread.type !== 'REDLINE') {
      return res.status(404).json({ message: 'Redline thread not found' });
    }

    // In a real implementation, we would modify the actual document text/clause
    // For now, we just mark the thread as applied
    thread.status = 'APPLIED';
    await thread.save();

    res.json({ message: 'Redline applied successfully', thread });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createThread, getThreads, replyToThread, resolveThread, applyRedline };
