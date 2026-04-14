const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firm: String,
  investmentRange: { min: Number, max: Number },
  industries: [String],
  bio: String,
  avatar: String,
  portfolio: [String],
  available: { type: Boolean, default: true },
  totalInvestments: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Investor', investorSchema);