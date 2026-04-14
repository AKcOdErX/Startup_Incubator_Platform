import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { dashboardAPI, aiAPI } from '../services/api';
import Layout from '../components/Layout';
import AIChat from '../components/AIChat';
import { TrendingUp, Users, DollarSign, Target, Clock, CheckCircle, Lightbulb, Rocket, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, activitiesRes, suggestionsRes] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getRecentActivity(),
        aiAPI.getSuggestions()
      ]);
      setStats(statsRes.data);
      setActivities(activitiesRes.data);
      setSuggestions(suggestionsRes.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Startup Stage', value: stats?.startupStage?.toUpperCase() || 'IDEA', icon: Rocket, color: 'from-blue-500 to-cyan-500' },
    { title: 'Industry', value: stats?.industry || 'Technology', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
    { title: 'Total Loans', value: `$${stats?.totalLoanAmount?.toLocaleString() || 0}`, icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { title: 'Active Mentorships', value: stats?.activeMentorships || 0, icon: Users, color: 'from-orange-500 to-red-500' }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="glass rounded-2xl p-6 bg-gradient-to-r from-indigo-500/10 to-pink-500/10">
          <h1 className="text-3xl font-bold gradient-text">Welcome back, {user?.name}! 👋</h1>
          <p className="text-gray-600 mt-2">Your next milestone: <span className="font-semibold text-indigo-600">{stats?.nextMilestone}</span></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-xl flex items-center justify-center`}>
                    <Icon size={24} className="text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb size={24} className="text-yellow-500" />
              <h2 className="text-xl font-semibold">AI-Powered Suggestions</h2>
            </div>
            <div className="space-y-3">
              {suggestions.map((suggestion, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 mt-2 rounded-full ${suggestion.priority === 'high' ? 'bg-red-500' : suggestion.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`} />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{suggestion.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <Clock size={24} className="text-indigo-500" />
              <h2 className="text-xl font-semibold">Recent Activity</h2>
            </div>
            <div className="space-y-3">
              {activities.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No recent activity</p>
              ) : (
                activities.map((activity, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle size={18} className="text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-pink-600 rounded-2xl p-6 text-white">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/30 transition text-center">
              <Target size={24} className="mx-auto mb-2" />
              <span className="text-sm">Set Milestones</span>
            </button>
            <button className="bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/30 transition text-center">
              <Users size={24} className="mx-auto mb-2" />
              <span className="text-sm">Find Mentor</span>
            </button>
            <button className="bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/30 transition text-center">
              <DollarSign size={24} className="mx-auto mb-2" />
              <span className="text-sm">Apply for Loan</span>
            </button>
            <button className="bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/30 transition text-center">
              <Calendar size={24} className="mx-auto mb-2" />
              <span className="text-sm">Schedule Session</span>
            </button>
          </div>
        </div>
      </div>
      <AIChat />
    </Layout>
  );
};

export default Dashboard;