const express = require('express');
const User = require('../models/User');
const Loan = require('../models/Loan');
const MentorshipRequest = require('../models/MentorshipRequest');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const loans = await Loan.find({ userId: req.user.id });
    const mentorshipRequests = await MentorshipRequest.find({ founderId: req.user.id });
    const stats = {
      startupStage: user.stage,
      industry: user.industry,
      totalLoanAmount: loans.reduce((sum, loan) => sum + (loan.status === 'approved' ? loan.amount : 0), 0),
      activeMentorships: mentorshipRequests.filter(r => r.status === 'accepted').length,
      pendingMentorships: mentorshipRequests.filter(r => r.status === 'pending').length,
      completedTasks: 0,
      nextMilestone: user.stage === 'idea' ? 'Complete customer discovery' : user.stage === 'mvp' ? 'Launch MVP to 100 users' : 'Achieve $10k MRR'
    };
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/recent-activity', auth, async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(3);
    const mentorships = await MentorshipRequest.find({ founderId: req.user.id }).populate('mentorId').sort({ createdAt: -1 }).limit(3);
    const activities = [];
    loans.forEach(loan => { activities.push({ type: 'loan', title: `Loan Application ${loan.status}`, description: `$${loan.amount} loan request was ${loan.status}`, date: loan.createdAt }); });
    mentorships.forEach(req => { activities.push({ type: 'mentorship', title: `Mentorship Request ${req.status}`, description: `Request to ${req.mentorId?.name || 'mentor'} is ${req.status}`, date: req.createdAt }); });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;