const Document = require('../models/Document');

// 1. GET /documents?q=keyword
const searchDocuments = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || !q.trim()) {
      return res.status(400).json({ message: 'Search query "q" is required' });
    }

    const results = await Document.find({
      uploaderId: req.user._id,
      name: { $regex: q.trim(), $options: 'i' },
    }).sort({ createdAt: -1 });

    res.json({ query: q, count: results.length, results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. GET /clauses?q=keyword
const searchClauses = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || !q.trim()) {
      return res.status(400).json({ message: 'Search query "q" is required' });
    }

    const documents = await Document.find({
      uploaderId: req.user._id,
      'extractedClauses.title': { $regex: q.trim(), $options: 'i' },
    });

    const matches = [];
    documents.forEach(doc => {
      const matching = (doc.extractedClauses || []).filter(clause =>
        clause.title.toLowerCase().includes(q.toLowerCase()) ||
        clause.content.toLowerCase().includes(q.toLowerCase())
      );
      if (matching.length > 0) {
        matches.push({ documentId: doc._id, documentName: doc.name, clauses: matching });
      }
    });

    res.json({ query: q, count: matches.length, results: matches });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. GET /risks?level=HIGH|MEDIUM|LOW
const searchRisks = async (req, res) => {
  try {
    const { level } = req.query;
    const validLevels = ['HIGH', 'MEDIUM', 'LOW'];

    let scoreFilter = {};
    if (level) {
      const l = level.toUpperCase();
      if (!validLevels.includes(l)) {
        return res.status(400).json({ message: 'level must be HIGH, MEDIUM, or LOW' });
      }
      if (l === 'HIGH') scoreFilter = { riskScore: { $gte: 70 } };
      else if (l === 'MEDIUM') scoreFilter = { riskScore: { $gte: 40, $lt: 70 } };
      else scoreFilter = { riskScore: { $lt: 40 } };
    }

    const results = await Document.find({
      uploaderId: req.user._id,
      status: 'ANALYZED',
      ...scoreFilter,
    }).sort({ riskScore: -1 });

    res.json({ level: level || 'ALL', count: results.length, results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. GET /filter-date?from=YYYY-MM-DD&to=YYYY-MM-DD
const filterByDate = async (req, res) => {
  try {
    const { from, to } = req.query;
    if (!from && !to) {
      return res.status(400).json({ message: 'Provide at least "from" or "to" date (YYYY-MM-DD)' });
    }

    const dateFilter = {};
    if (from) dateFilter.$gte = new Date(from);
    if (to) {
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999);
      dateFilter.$lte = toDate;
    }

    const results = await Document.find({
      uploaderId: req.user._id,
      createdAt: dateFilter,
    }).sort({ createdAt: -1 });

    res.json({ from: from || null, to: to || null, count: results.length, results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. GET /filter-risk?level=HIGH|MEDIUM|LOW
const filterByRiskLevel = async (req, res) => {
  try {
    const { level } = req.query;
    const validLevels = ['HIGH', 'MEDIUM', 'LOW'];
    if (!level || !validLevels.includes(level.toUpperCase())) {
      return res.status(400).json({ message: 'level must be HIGH, MEDIUM, or LOW' });
    }

    const l = level.toUpperCase();
    let scoreFilter = {};
    if (l === 'HIGH') scoreFilter = { riskScore: { $gte: 70 } };
    else if (l === 'MEDIUM') scoreFilter = { riskScore: { $gte: 40, $lt: 70 } };
    else scoreFilter = { riskScore: { $lt: 40 } };

    const results = await Document.find({
      uploaderId: req.user._id,
      status: 'ANALYZED',
      ...scoreFilter,
    }).sort({ riskScore: -1 });

    res.json({ level: l, count: results.length, results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { searchDocuments, searchClauses, searchRisks, filterByDate, filterByRiskLevel };
