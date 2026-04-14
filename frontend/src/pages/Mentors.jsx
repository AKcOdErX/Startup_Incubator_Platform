import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AIChat from '../components/AIChat';
import { mentorAPI } from '../services/api';
import { Star, Award } from 'lucide-react';
import toast from 'react-hot-toast';

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [requestMessage, setRequestMessage] = useState('');

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const response = await mentorAPI.getAll();
      setMentors(response.data);
    } catch (error) {
      toast.error('Failed to load mentors');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestMentorship = async (mentorId) => {
    if (!requestMessage.trim()) {
      toast.error('Please provide a message explaining your goals');
      return;
    }
    try {
      await mentorAPI.requestMentorship(mentorId, requestMessage);
      toast.success('Mentorship request sent successfully!');
      setSelectedMentor(null);
      setRequestMessage('');
    } catch (error) {
      toast.error('Failed to send request');
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text">Expert Mentors</h1>
          <p className="text-gray-600 mt-2">Learn from industry leaders who have built successful companies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor._id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-pink-500">
                <div className="absolute -bottom-12 left-6">
                  <img src={mentor.avatar || `https://ui-avatars.com/api/?name=${mentor.name}&background=6366f1&color=fff`} alt={mentor.name} className="w-24 h-24 rounded-full border-4 border-white object-cover bg-white" />
                </div>
              </div>
              <div className="pt-14 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{mentor.name}</h3>
                    <p className="text-indigo-600 text-sm">{mentor.position} at {mentor.company}</p>
                  </div>
                  <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold">{mentor.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-3 line-clamp-2">{mentor.bio}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {mentor.expertise.slice(0, 3).map((exp, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{exp}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Award size={14} />
                    <span>{mentor.sessionsCompleted}+ sessions</span>
                  </div>
                  <button onClick={() => setSelectedMentor(mentor)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium">Request Mentorship</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMentor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-2">Request Mentorship from {selectedMentor.name}</h3>
            <p className="text-gray-600 text-sm mb-4">Share what you'd like to learn and your current challenges</p>
            <textarea value={requestMessage} onChange={(e) => setRequestMessage(e.target.value)} placeholder="I'm working on... I need guidance on..." rows="4" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <div className="flex space-x-3 mt-4">
              <button onClick={() => handleRequestMentorship(selectedMentor._id)} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">Send Request</button>
              <button onClick={() => setSelectedMentor(null)} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
      <AIChat />
    </Layout>
  );
};

export default Mentors;