const ClauseLibrary = require('../models/ClauseLibrary');

// 1. Create a Standard Clause
const createClause = async (req, res) => {
  try {
    const { name, type, standardText, alternativeText, riskLevel } = req.body;
    
    if (!name || !type || !standardText) {
      return res.status(400).json({ message: 'name, type, and standardText are required' });
    }

    const clause = await ClauseLibrary.create({
      name,
      type,
      standardText,
      alternativeText,
      riskLevel: riskLevel || 'LOW',
      createdBy: req.user._id
    });

    res.status(201).json(clause);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Get All Standard Clauses
const getClauses = async (req, res) => {
  try {
    // In a real app, this might be scoped to req.user.teamId
    const clauses = await ClauseLibrary.find().sort({ createdAt: -1 });
    res.json(clauses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Update Clause
const updateClause = async (req, res) => {
  try {
    const clause = await ClauseLibrary.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!clause) return res.status(404).json({ message: 'Clause not found' });
    res.json(clause);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Delete Clause
const deleteClause = async (req, res) => {
  try {
    const clause = await ClauseLibrary.findByIdAndDelete(req.params.id);
    if (!clause) return res.status(404).json({ message: 'Clause not found' });
    res.json({ message: 'Clause deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Compare Document Clause vs Library Clause
const compareClause = async (req, res) => {
  try {
    const { documentClauseText, libraryClauseId } = req.body;
    if (!documentClauseText || !libraryClauseId) {
      return res.status(400).json({ message: 'documentClauseText and libraryClauseId are required' });
    }

    const libraryClause = await ClauseLibrary.findById(libraryClauseId);
    if (!libraryClause) return res.status(404).json({ message: 'Library clause not found' });

    // Mock comparison logic (AI would normally do this)
    const deviationScore = Math.floor(Math.random() * 100);
    const isRisky = deviationScore > 40;

    res.json({
      libraryClause,
      documentClauseText,
      deviationScore,
      isRisky,
      feedback: isRisky ? 'The document clause deviates significantly from the standard library text. Review recommended.' : 'The document clause is closely aligned with the standard.'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createClause, getClauses, updateClause, deleteClause, compareClause };
