const Document = require('../models/Document');

// Helpers — simulated AI analysis (replace with real LLM calls when ready)
const simulateRiskScore = () => Math.floor(Math.random() * 100);

const SAMPLE_CLAUSES = [
  { title: 'Limitation of Liability', content: 'Neither party shall be liable for indirect, incidental, or consequential damages.', type: 'RISK' },
  { title: 'Indemnification', content: 'Each party agrees to indemnify and hold harmless the other party.', type: 'RISK' },
  { title: 'Confidentiality', content: 'All information shared under this agreement shall remain confidential.', type: 'INFO' },
  { title: 'Termination', content: 'Either party may terminate with 30 days written notice.', type: 'INFO' },
  { title: 'Governing Law', content: 'This agreement shall be governed by the laws of the State of Delaware.', type: 'INFO' },
  { title: 'Auto-Renewal', content: 'This agreement automatically renews annually unless cancelled 60 days prior.', type: 'RISK' },
];

const RISK_PATTERNS = [
  { type: 'HIGH', description: 'Auto-renewal clause detected — may cause unintended contract extension.' },
  { type: 'MEDIUM', description: 'Broad indemnification scope — review liability exposure.' },
  { type: 'LOW', description: 'Vague termination notice period — consider specifying exact days.' },
];

// 1. POST /analyze/:id — marks doc as ANALYZED, saves clauses & risk score
const analyzeContract = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const riskScore = simulateRiskScore();
    const extractedClauses = SAMPLE_CLAUSES.slice(0, 4);

    const updated = await Document.findByIdAndUpdate(
      req.params.id,
      { status: 'ANALYZED', riskScore, extractedClauses },
      { new: true }
    );

    res.json({ message: 'Contract analyzed successfully', data: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. POST /summary/:id
const generateSummary = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    res.json({
      documentId: document._id,
      name: document.name,
      summary: `This document titled "${document.name}" is a ${document.status.toLowerCase()} contract. ` +
        `It contains ${document.extractedClauses?.length || 0} identified clauses with a current risk score of ${document.riskScore}. ` +
        `Key areas include liability, termination conditions, and renewal terms.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. GET /clauses/:id
const extractClauses = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const clauses = document.extractedClauses?.length > 0 ? document.extractedClauses : SAMPLE_CLAUSES;
    res.json({ documentId: document._id, clauses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. GET /risks/:id
const detectRisks = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const riskLevel = document.riskScore >= 70 ? 'HIGH' : document.riskScore >= 40 ? 'MEDIUM' : 'LOW';
    res.json({
      documentId: document._id,
      overallRiskScore: document.riskScore,
      overallRiskLevel: riskLevel,
      risks: RISK_PATTERNS,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. POST /compliance/:id
const complianceCheck = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const standard = req.body.standard || 'GDPR';
    const complianceResults = {
      GDPR: { compliant: true, issues: [], recommendation: 'Document meets basic GDPR data handling requirements.' },
      HIPAA: { compliant: false, issues: ['Missing PHI handling clause', 'No BAA reference found'], recommendation: 'Add Business Associate Agreement reference.' },
      SOC2: { compliant: true, issues: [], recommendation: 'Document aligns with SOC2 security principles.' },
    };

    const result = complianceResults[standard] || { compliant: true, issues: [], recommendation: 'Standard not recognized, basic check passed.' };
    res.json({ documentId: document._id, standard, ...result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. GET /risk-score/:id
const getRiskScore = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const level = document.riskScore >= 70 ? 'HIGH' : document.riskScore >= 40 ? 'MEDIUM' : 'LOW';
    res.json({ documentId: document._id, score: document.riskScore, level });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 7. POST /simplify
const simplifyLanguage = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Text is required' });
    }
    // Simulate simplification
    const simplified = text
      .replace(/hereinafter/gi, 'from now on')
      .replace(/notwithstanding/gi, 'despite')
      .replace(/pursuant to/gi, 'according to')
      .replace(/indemnify and hold harmless/gi, 'protect from losses')
      .replace(/forthwith/gi, 'immediately');

    res.json({ original: text, simplified });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 8. GET /missing-clauses/:id
const detectMissingClauses = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const existingTitles = (document.extractedClauses || []).map(c => c.title.toLowerCase());
    const standardClauses = ['governing law', 'severability', 'dispute resolution', 'force majeure', 'entire agreement', 'waiver'];
    const missing = standardClauses.filter(c => !existingTitles.includes(c));

    res.json({ documentId: document._id, missing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 9. GET /improvements/:id
const suggestImprovements = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    res.json({
      documentId: document._id,
      suggestions: [
        'Clarify the termination notice period with an exact number of days.',
        'Add a Force Majeure clause to protect against unforeseeable events.',
        'Specify the jurisdiction for dispute resolution more precisely.',
        'Include a data breach notification clause if handling personal data.',
      ],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 10. GET /deadlines/:id
const detectDeadlines = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    // In a real implementation, parse dates from document text
    const today = new Date();
    const renewalDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
    const reviewDate = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());

    res.json({
      documentId: document._id,
      deadlines: [
        { date: renewalDate.toISOString().split('T')[0], description: 'Contract renewal / expiration date', type: 'RENEWAL' },
        { date: reviewDate.toISOString().split('T')[0], description: 'Mid-term review date', type: 'REVIEW' },
      ],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 11. POST /renewals/:id
const setupRenewalReminder = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const { reminderDate, notes } = req.body;
    if (!reminderDate) return res.status(400).json({ message: 'reminderDate is required' });

    // In a real implementation, save reminder to DB and schedule notification
    res.json({
      message: 'Renewal reminder set successfully',
      documentId: document._id,
      reminderDate,
      notes: notes || '',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 12. POST /compare
const compareContracts = async (req, res) => {
  try {
    const { documentId1, documentId2 } = req.body;
    if (!documentId1 || !documentId2) {
      return res.status(400).json({ message: 'documentId1 and documentId2 are required' });
    }

    const [doc1, doc2] = await Promise.all([
      Document.findOne({ _id: documentId1, uploaderId: req.user._id }),
      Document.findOne({ _id: documentId2, uploaderId: req.user._id }),
    ]);

    if (!doc1) return res.status(404).json({ message: 'Document 1 not found' });
    if (!doc2) return res.status(404).json({ message: 'Document 2 not found' });

    const clauses1 = (doc1.extractedClauses || []).map(c => c.title);
    const clauses2 = (doc2.extractedClauses || []).map(c => c.title);
    const onlyInDoc1 = clauses1.filter(c => !clauses2.includes(c));
    const onlyInDoc2 = clauses2.filter(c => !clauses1.includes(c));
    const common = clauses1.filter(c => clauses2.includes(c));

    res.json({
      document1: { id: doc1._id, name: doc1.name, riskScore: doc1.riskScore },
      document2: { id: doc2._id, name: doc2.name, riskScore: doc2.riskScore },
      comparison: {
        commonClauses: common,
        onlyInDocument1: onlyInDoc1,
        onlyInDocument2: onlyInDoc2,
        riskScoreDifference: Math.abs(doc1.riskScore - doc2.riskScore),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 13. POST /suggest-redline/:id
const suggestRedline = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const { clauseId, clauseText } = req.body;
    if (!clauseText) return res.status(400).json({ message: 'clauseText is required' });

    // Mock redline suggestion
    const suggestedText = clauseText
      .replace(/shall be liable for/gi, 'shall not be liable for')
      .replace(/automatically renews/gi, 'renews upon written agreement');

    res.json({
      originalText: clauseText,
      suggestedRedline: suggestedText,
      explanation: 'Reduced liability and removed auto-renewal risk.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  analyzeContract, generateSummary, extractClauses, detectRisks,
  complianceCheck, getRiskScore, simplifyLanguage, detectMissingClauses,
  suggestImprovements, detectDeadlines, setupRenewalReminder, compareContracts, suggestRedline
};
