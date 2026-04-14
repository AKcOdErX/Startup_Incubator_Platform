const express = require('express');
const Loan = require('../models/Loan');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/apply', auth, async (req, res) => {
  try {
    const { amount, termMonths, purpose, businessPlan } = req.body;
    const user = await User.findById(req.user.id);
    let status = 'pending';
    let approvedAmount = amount;
    if (user.stage === 'growth' || user.stage === 'scale') status = 'approved';
    else if (user.stage === 'mvp' && amount <= 50000) status = 'approved';
    else if (amount <= 25000) status = 'approved';
    const loan = new Loan({ userId: req.user.id, amount, termMonths, purpose, businessPlan, status, approvedAmount: status === 'approved' ? amount : null, disbursementDate: status === 'approved' ? new Date() : null });
    await loan.save();
    res.status(201).json({ message: status === 'approved' ? 'Loan approved successfully!' : 'Loan application submitted for review', loan });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/my', auth, async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const loan = await Loan.findOne({ _id: req.params.id, userId: req.user.id });
    if (!loan) return res.status(404).json({ message: 'Loan not found' });
    res.json(loan);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;