const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  termMonths: { type: Number, required: true },
  purpose: { type: String, required: true },
  businessPlan: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'disbursed'], default: 'pending' },
  interestRate: { type: Number, default: 8.5 },
  approvedAmount: Number,
  disbursementDate: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Loan', loanSchema);