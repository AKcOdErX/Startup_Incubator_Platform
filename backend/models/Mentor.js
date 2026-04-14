const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  expertise: [String],
  bio: String,
  experience: Number,
  company: String,
  position: String,
  avatar: String,
  available: { type: Boolean, default: true },
  rating: { type: Number, min: 0, max: 5, default: 4.5 },
  sessionsCompleted: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Mentor', mentorSchema);