const mongoose = require('mongoose');

const mentorshipRequestSchema = new mongoose.Schema({
  founderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
  message: String,
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MentorshipRequest', mentorshipRequestSchema);