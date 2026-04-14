import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import { aiAPI } from '../services/api';
import { Bot, Send, Sparkles, Lightbulb, TrendingUp, DollarSign, Users, Target } from 'lucide-react';
import toast from 'react-hot-toast';

const AIAssistant = () => {
  const [messages, setMessages] = useState([{ role: 'assistant', content: "Hello! I'm your dedicated AI startup advisor. I can help you with:\n\n• Marketing strategies and growth hacking\n• Fundraising and investor outreach\n• Product development and validation\n• Team building and culture\n• Financial planning and loans\n• Mentor connections\n\nWhat would you like to focus on today?" }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);
    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await aiAPI.chat(userMessage, history);
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
    } catch (error) {
      toast.error('Failed to get AI response');
    } finally { setLoading(false); }
  };

  const quickQuestions = [
    { icon: TrendingUp, text: "How to get my first 100 customers?" },
    { icon: DollarSign, text: "What's the best way to raise seed funding?" },
    { icon: Lightbulb, text: "How to validate my business idea?" },
    { icon: Users, text: "Tips for building a founding team" },
    { icon: Target, text: "How to create a go-to-market strategy?" },
    { icon: Bot, text: "Should I apply for a business loan?" }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-4 py-2 rounded-full mb-4"><Sparkles size={18} /><span className="text-sm font-medium">AI-Powered Advisor</span></div>
          <h1 className="text-4xl font-bold gradient-text">AI Startup Assistant</h1>
          <p className="text-gray-600 mt-2">Get personalized advice to scale your startup successfully</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-5 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-br-sm' : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'}`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white px-5 py-3 rounded-2xl shadow-sm"><div className="flex space-x-1"><div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div><div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div><div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div></div></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-6 py-3 border-t border-gray-100 bg-white">
            <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q, idx) => {
                const Icon = q.icon;
                return <button key={idx} onClick={() => setInput(q.text)} className="flex items-center space-x-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition"><Icon size={12} /><span>{q.text.substring(0, 30)}...</span></button>;
              })}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()} placeholder="Ask me anything about growing your startup..." className="flex-1 resize-none rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" rows="2" />
              <button onClick={sendMessage} disabled={loading || !input.trim()} className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-6 rounded-xl hover:opacity-90 transition disabled:opacity-50"><Send size={20} /></button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4"><h3 className="font-semibold text-indigo-800 mb-2">💡 Pro Tip</h3><p className="text-sm text-gray-700">Ask for specific advice based on your startup stage (idea, MVP, growth)</p></div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4"><h3 className="font-semibold text-purple-800 mb-2">🚀 Growth Hack</h3><p className="text-sm text-gray-700">Focus on one channel at a time until you find product-market fit</p></div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4"><h3 className="font-semibold text-green-800 mb-2">💰 Funding Insight</h3><p className="text-sm text-gray-700">Investors care more about traction than just the idea</p></div>
        </div>
      </div>
    </Layout>
  );
};

export default AIAssistant;