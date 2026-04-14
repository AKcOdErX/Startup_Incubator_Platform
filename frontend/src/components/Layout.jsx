import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, Briefcase, CreditCard, Bot, LogOut, Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Mentors', href: '/mentors', icon: Users },
    { name: 'Investors', href: '/investors', icon: Briefcase },
    { name: 'Loans', href: '/loans', icon: CreditCard },
    { name: 'AI Assistant', href: '/ai-assistant', icon: Bot },
  ];

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <nav className="glass sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="font-bold text-xl gradient-text">StartupIncubator</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link key={item.name} to={item.href} className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'}`}>
                    <Icon size={18} /><span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">{user?.name?.charAt(0) || 'U'}</div>
                  <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                </div>
                <button onClick={handleLogout} className="p-2 text-gray-600 hover:text-red-600 transition-colors"><LogOut size={20} /></button>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden glass border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link key={item.name} to={item.href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-indigo-50'}`}>
                    <Icon size={18} /><span>{item.name}</span>
                  </Link>
                );
              })}
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"><LogOut size={18} /><span>Logout</span></button>
            </div>
          </div>
        )}
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
};

export default Layout;