import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Rocket, Mail, Lock, User, Building2, Globe } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', startupName: '', industry: 'technology', stage: 'idea' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await register(formData);
    setLoading(false);
    if (success) navigate('/dashboard');
  };

  const industries = ['Technology', 'Fintech', 'Healthcare', 'E-commerce', 'EdTech', 'SaaS', 'AI/ML', 'CleanTech', 'Other'];
  const stages = ['idea', 'mvp', 'growth', 'scale'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-2xl mb-4"><Rocket size={32} className="text-white" /></div>
          <h1 className="text-3xl font-bold gradient-text">Start Your Journey</h1>
          <p className="text-gray-600 mt-2">Join the ultimate startup incubator platform</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-h-[85vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label><div className="relative"><User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} /><input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="John Doe" /></div></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><div className="relative"><Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} /><input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="founder@startup.com" /></div></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} /><input type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="••••••••" /></div></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Startup Name</label><div className="relative"><Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} /><input type="text" value={formData.startupName} onChange={(e) => setFormData({ ...formData, startupName: e.target.value })} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="My Awesome Startup" /></div></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Industry</label><div className="relative"><Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} /><select value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">{industries.map(ind => <option key={ind} value={ind.toLowerCase()}>{ind}</option>)}</select></div></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Startup Stage</label><select value={formData.stage} onChange={(e) => setFormData({ ...formData, stage: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"><option value="idea">Idea Stage</option><option value="mvp">MVP / Prototype</option><option value="growth">Growth Stage</option><option value="scale">Scaling</option></select></div>
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 mt-4">{loading ? 'Creating Account...' : 'Create Account'}</button>
          </form>
          <div className="mt-6 text-center"><p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">Sign In</Link></p></div>
        </div>
      </div>
    </div>
  );
};

export default Register;