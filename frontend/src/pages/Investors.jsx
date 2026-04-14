import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AIChat from '../components/AIChat';
import { investorAPI } from '../services/api';
import toast from 'react-hot-toast';

const Investors = () => {
  const [investors, setInvestors] = useState([]);
  const [selectedInvestor, setSelectedInvestor] = useState(null);

  useEffect(() => {
    fetchInvestors();
  }, []);

  const fetchInvestors = async () => {
    try {
      const response = await investorAPI.getAll();
      setInvestors(response.data);
    } catch (error) {
      toast.error('Failed to load investors');
    }
  };

  const handleExpressInterest = async (investorId) => {
    try {
      await investorAPI.expressInterest(investorId);
      toast.success('Interest expressed! The investor will review your pitch.');
      setSelectedInvestor(null);
    } catch (error) {
      toast.error('Failed to express interest');
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text">Investors Network</h1>
          <p className="text-gray-600 mt-2">Connect with investors ready to fund the next big idea</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investors.map((investor) => (
            <div key={investor._id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <img src={investor.avatar || `https://ui-avatars.com/api/?name=${investor.name}&background=8b5cf6&color=fff`} alt={investor.name} className="w-16 h-16 rounded-full object-cover" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{investor.name}</h3>
                    <p className="text-indigo-600 text-sm font-medium">{investor.firm}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-3">{investor.bio}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Investment Range:</span>
                    <span className="font-semibold text-green-600">${investor.investmentRange?.min?.toLocaleString()} - ${investor.investmentRange?.max?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Total Investments:</span>
                    <span className="font-semibold text-gray-700">{investor.totalInvestments} companies</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {investor.industries?.slice(0, 3).map((industry, idx) => (
                    <span key={idx} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">{industry}</span>
                  ))}
                </div>
                <button onClick={() => setSelectedInvestor(investor)} className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition font-medium">Express Interest</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedInvestor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-2">Connect with {selectedInvestor.name}</h3>
            <p className="text-gray-600 mb-4">Share your pitch deck or a brief introduction about your startup</p>
            <textarea placeholder="Hi, I'm building... We're looking for... Our traction so far..." rows="4" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <div className="flex space-x-3 mt-4">
              <button onClick={() => handleExpressInterest(selectedInvestor._id)} className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">Send Introduction</button>
              <button onClick={() => setSelectedInvestor(null)} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
      <AIChat />
    </Layout>
  );
};

export default Investors;