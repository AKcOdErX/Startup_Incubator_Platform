const express = require('express');
const Mentor = require('../models/Mentor');
const MentorshipRequest = require('../models/MentorshipRequest');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/request', auth, async (req, res) => {
  try {
    const { message } = req.body;
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });
    const existingRequest = await MentorshipRequest.findOne({ founderId: req.user.id, mentorId: req.params.id, status: 'pending' });
    if (existingRequest) return res.status(400).json({ message: 'Request already pending' });
    const request = new MentorshipRequest({ founderId: req.user.id, mentorId: req.params.id, message });
    await request.save();
    res.status(201).json({ message: 'Mentorship request sent successfully', request });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/requests/my', auth, async (req, res) => {
  try {
    const requests = await MentorshipRequest.find({ founderId: req.user.id }).populate('mentorId');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;