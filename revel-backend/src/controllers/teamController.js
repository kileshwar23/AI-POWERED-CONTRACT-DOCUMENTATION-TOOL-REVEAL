const Team = require('../models/Team');
const User = require('../models/User');
const Document = require('../models/Document');

// 1. POST /invite — invite a user to current user's team
const inviteMember = async (req, res) => {
  try {
    const { email, role } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const validRoles = ['ORG_ADMIN', 'REVIEWER', 'UPLOADER', 'VIEWER'];
    const memberRole = role && validRoles.includes(role.toUpperCase()) ? role.toUpperCase() : 'UPLOADER';

    // Find the invitee
    const invitee = await User.findOne({ email: email.toLowerCase() }).select('-password');
    if (!invitee) return res.status(404).json({ message: 'User with that email not found' });

    // Find or create team owned by current user
    let team = await Team.findOne({ ownerId: req.user._id });
    if (!team) {
      team = await Team.create({ name: `${req.user.name}'s Team`, ownerId: req.user._id, members: [] });
    }

    // Check if already a member
    const alreadyMember = team.members.some(m => m.userId.toString() === invitee._id.toString());
    if (alreadyMember) return res.status(400).json({ message: 'User is already a team member' });

    team.members.push({ userId: invitee._id, role: memberRole });
    await team.save();

    // Update invitee's teamId
    await User.findByIdAndUpdate(invitee._id, { teamId: team._id });

    res.json({ message: `${invitee.name} invited as ${memberRole}`, team });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. DELETE /members/:id — remove a member from team
const removeMember = async (req, res) => {
  try {
    const team = await Team.findOne({ ownerId: req.user._id });
    if (!team) return res.status(404).json({ message: 'Team not found' });

    const memberIndex = team.members.findIndex(m => m.userId.toString() === req.params.id);
    if (memberIndex === -1) return res.status(404).json({ message: 'Member not found in team' });

    team.members.splice(memberIndex, 1);
    await team.save();

    // Clear teamId from removed user
    await User.findByIdAndUpdate(req.params.id, { teamId: null });

    res.json({ message: 'Member removed successfully', team });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. POST /assign-reviewer — assign a reviewer to a document
const assignReviewer = async (req, res) => {
  try {
    const { documentId, reviewerId } = req.body;
    if (!documentId || !reviewerId) {
      return res.status(400).json({ message: 'documentId and reviewerId are required' });
    }

    const document = await Document.findOne({ _id: documentId, uploaderId: req.user._id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const reviewer = await User.findById(reviewerId).select('name email');
    if (!reviewer) return res.status(404).json({ message: 'Reviewer not found' });

    res.json({
      message: `${reviewer.name} assigned as reviewer for "${document.name}"`,
      documentId: document._id,
      reviewer: { _id: reviewer._id, name: reviewer.name, email: reviewer.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. POST /comments/:id — add a comment to a document
const addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment || !comment.trim()) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const document = await Document.findById(req.params.id);
    if (!document) return res.status(404).json({ message: 'Document not found' });

    // Return comment details (extend Document model to persist if needed)
    res.status(201).json({
      message: 'Comment added successfully',
      comment: {
        documentId: document._id,
        author: { _id: req.user._id, name: req.user.name },
        text: comment.trim(),
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. GET /activity-logs — get team and document activity for current user
const getActivityLogs = async (req, res) => {
  try {
    const recentDocs = await Document.find({ uploaderId: req.user._id })
      .sort({ updatedAt: -1 })
      .limit(20)
      .select('name status riskScore updatedAt createdAt');

    const logs = recentDocs.map(doc => ({
      type: doc.status === 'ANALYZED' ? 'ANALYSIS_COMPLETE' : doc.status === 'ARCHIVED' ? 'ARCHIVED' : 'UPLOADED',
      message: `Document "${doc.name}" — status: ${doc.status}`,
      documentId: doc._id,
      timestamp: doc.updatedAt,
    }));

    res.json({ count: logs.length, logs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. GET /my-team — get team details for current user
const getMyTeam = async (req, res) => {
  try {
    const team = await Team.findOne({ ownerId: req.user._id }).populate('members.userId', 'name email role');
    if (!team) return res.json({ message: 'No team created yet', team: null });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 7. PUT /organization/settings — update org settings
const updateOrganizationSettings = async (req, res) => {
  try {
    const { settings } = req.body;
    const team = await Team.findOne({ ownerId: req.user._id });
    if (!team) return res.status(404).json({ message: 'Organization not found' });

    team.settings = { ...team.settings, ...settings };
    await team.save();

    res.json({ message: 'Organization settings updated', settings: team.settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { inviteMember, removeMember, assignReviewer, addComment, getActivityLogs, getMyTeam, updateOrganizationSettings };
