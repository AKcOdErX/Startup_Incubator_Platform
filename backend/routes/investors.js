const express = require('express');
const Investor = require('../models/Investor');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const investors = await Investor.find();
    res.json(investors);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const investor = await Investor.findById(req.params.id);
    if (!investor) return res.status(404).json({ message: 'Investor not found' });
    res.json(investor);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/interest', auth, async (req, res) => {
  try {
    res.json({ message: 'Interest expressed successfully! The investor will review your pitch.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;