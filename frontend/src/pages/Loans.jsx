import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AIChat from '../components/AIChat';
import { loanAPI } from '../services/api';
import { DollarSign, Clock, CheckCircle, XCircle, TrendingUp, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [formData, setFormData] = useState({ amount: '', termMonths: '12', purpose: '', businessPlan: '' });

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await loanAPI.getMyLoans();
      setLoans(response.data);
    } catch (error) {
      toast.error('Failed to load loans');
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.purpose) {
      toast.error('Please fill all required fields');
      return;
    }
    try {
      const response = await loanAPI.apply({ amount: Number(formData.amount), termMonths: Number(formData.termMonths), purpose: formData.purpose, businessPlan: formData.businessPlan });
      toast.success(response.data.message);
      setShowApplyForm(false);
      setFormData({ amount: '', termMonths: '12', purpose: '', businessPlan: '' });
      fetchLoans();
    } catch (error) {
      toast.error('Failed to apply for loan');
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle },
      disbursed: { color: 'bg-blue-100 text-blue-800', icon: TrendingUp }
    };
    const { color, icon: Icon } = config[status] || config.pending;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        <Icon size={12} className="mr-1" />
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold gradient-text">Business Loans</h1>
            <p className="text-gray-600 mt-2">Get funding to accelerate your startup growth</p>
          </div>
          <button onClick={() => setShowApplyForm(true)} className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition">Apply for Loan</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white"><DollarSign size={32} /><p className="text-2xl font-bold mt-2">Up to $100,000</p><p className="text-sm opacity-90">Loan Amount</p></div>
          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6 text-white"><TrendingUp size={32} /><p className="text-2xl font-bold mt-2">8.5% APR</p><p className="text-sm opacity-90">Competitive Interest Rate</p></div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white"><Clock size={32} /><p className="text-2xl font-bold mt-2">12-60 Months</p><p className="text-sm opacity-90">Flexible Terms</p></div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Your Loan Applications</h2>
          {loans.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No loan applications yet</p>
          ) : (
            <div className="space-y-3">
              {loans.map((loan) => (
                <div key={loan._id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-xl text-gray-800">${loan.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">{loan.purpose}</p>
                      <div className="flex items-center space-x-3 mt-2">
                        <span className="text-xs text-gray-400"><Calendar size={12} className="inline mr-1" />{new Date(loan.createdAt).toLocaleDateString()}</span>
                        <span className="text-xs text-gray-400">{loan.termMonths} months term</span>
                      </div>
                    </div>
                    <div>{getStatusBadge(loan.status)}</div>
                  </div>
                  {loan.status === 'approved' && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg"><p className="text-sm text-green-800">✓ Loan approved! Funds will be disbursed within 3-5 business days.</p></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showApplyForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Apply for Business Loan</h3>
            <form onSubmit={handleApply} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount ($)</label><input type="number" required value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter amount" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Term (Months)</label><select value={formData.termMonths} onChange={(e) => setFormData({ ...formData, termMonths: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"><option value="12">12 months</option><option value="24">24 months</option><option value="36">36 months</option><option value="48">48 months</option><option value="60">60 months</option></select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Purpose of Loan</label><input type="text" required value={formData.purpose} onChange={(e) => setFormData({ ...formData, purpose: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., Product Development, Marketing, Hiring" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Business Plan Summary</label><textarea value={formData.businessPlan} onChange={(e) => setFormData({ ...formData, businessPlan: e.target.value })} rows="3" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Briefly describe your business model and how you'll use the funds..." /></div>
              <div className="flex space-x-3 pt-4"><button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">Submit Application</button><button type="button" onClick={() => setShowApplyForm(false)} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">Cancel</button></div>
            </form>
          </div>
        </div>
      )}
      <AIChat />
    </Layout>
  );
};

export default Loans;