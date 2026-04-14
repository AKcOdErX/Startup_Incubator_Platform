import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { aiAPI } from '../services/api';
import toast from 'react-hot-toast';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: "Hi! I'm your AI startup assistant. How can I help you grow your business today? I can advise on marketing, funding, product development, and more!" }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages]);
  useEffect(() => { if (isOpen && !isMinimized) inputRef.current?.focus(); }, [isOpen, isMinimized]);

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
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting. Please try again." }]);
    } finally { setLoading(false); }
  };

  const handleKeyPress = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  if (!isOpen) return (
    <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-indigo-600 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
      <Bot size={28} /><span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></span>
    </button>
  );

  return (
    <div className={`fixed z-50 transition-all duration-300 ${isMinimized ? 'bottom-6 right-6 w-80 h-14' : 'bottom-6 right-6 w-96 h-[500px]'} bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200`}>
      <div className="bg-gradient-to-r from-indigo-600 to-pink-600 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2"><Bot size={20} className="text-white" /><span className="font-semibold text-white">AI Startup Assistant</span></div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="text-white hover:text-gray-200 transition">{isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}</button>
          <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 transition"><X size={18} /></button>
        </div>
      </div>
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'}`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-2xl shadow-sm"><div className="flex space-x-1"><div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div><div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div><div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div></div></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <textarea ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} placeholder="Ask me about marketing, funding, product, or growth..." className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" rows="1" style={{ maxHeight: '80px' }} />
              <button onClick={sendMessage} disabled={loading || !input.trim()} className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"><Send size={20} /></button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">💡 Try: "How to get funding?" or "Marketing tips for my startup"</p>
          </div>
        </>
      )}
    </div>
  );
};

export default AIChat;