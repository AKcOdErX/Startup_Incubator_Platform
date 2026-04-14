const Mentor = require('../models/Mentor');
const Investor = require('../models/Investor');

const mentorsData = [
  { name: 'Dr. Sarah Chen', email: 'sarah.chen@example.com', expertise: ['Product Strategy', 'Growth Marketing', 'SaaS'], bio: 'Former VP Product at TechUnicorn, helped 20+ startups scale from 0 to $10M ARR', experience: 15, company: 'GrowthLabs', position: 'Startup Advisor', avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=6366f1&color=fff', rating: 4.9, sessionsCompleted: 342 },
  { name: 'Michael Rodriguez', email: 'michael.rod@example.com', expertise: ['Fundraising', 'Venture Capital', 'Pitch Decks'], bio: 'Ex-VC at Sequoia, raised $50M+ for portfolio companies', experience: 12, company: 'FundWise', position: 'Investment Advisor', avatar: 'https://ui-avatars.com/api/?name=Michael+R&background=8b5cf6&color=fff', rating: 4.8, sessionsCompleted: 278 },
  { name: 'Priya Patel', email: 'priya.patel@example.com', expertise: ['AI/ML', 'Tech Architecture', 'Team Building'], bio: 'CTO of AI startup acquired by Google, expert in building tech teams', experience: 10, company: 'TechMentorAI', position: 'Technical Advisor', avatar: 'https://ui-avatars.com/api/?name=Priya+Patel&background=10b981&color=fff', rating: 4.95, sessionsCompleted: 410 },
  { name: 'James Wilson', email: 'james.wilson@example.com', expertise: ['Sales Strategy', 'B2B Sales', 'Customer Success'], bio: 'Built sales teams from 0 to 50+ reps, generated $20M+ in revenue', experience: 18, company: 'SalesMastery', position: 'Sales Advisor', avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=ef4444&color=fff', rating: 4.7, sessionsCompleted: 195 }
];

const investorsData = [
  { name: 'Alex Thompson', email: 'alex@thompson.vc', firm: 'Thompson Ventures', investmentRange: { min: 50000, max: 500000 }, industries: ['SaaS', 'Fintech', 'AI'], bio: 'Early-stage investor focused on disruptive B2B SaaS', avatar: 'https://ui-avatars.com/api/?name=Alex+T&background=3b82f6&color=fff', portfolio: ['CloudSync', 'DataFlow AI', 'PayEase'], totalInvestments: 45 },
  { name: 'Emily Zhao', email: 'emily@zhao.capital', firm: 'Zhao Capital', investmentRange: { min: 25000, max: 250000 }, industries: ['E-commerce', 'Consumer Tech', 'HealthTech'], bio: 'Passionate about founder-led companies with strong unit economics', avatar: 'https://ui-avatars.com/api/?name=Emily+Zhao&background=ec4899&color=fff', portfolio: ['ShopSwift', 'HealthTrack', 'EcoGoods'], totalInvestments: 32 },
  { name: 'David Kim', email: 'david@kim.angel', firm: 'Kim Angel Network', investmentRange: { min: 10000, max: 100000 }, industries: ['EdTech', 'PropTech', 'Marketplace'], bio: 'Angel investor with portfolio of 50+ startups, focus on seed stage', avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=f59e0b&color=fff', portfolio: ['LearnHub', 'SpaceFinder', 'TaskFlow'], totalInvestments: 67 },
  { name: 'Maria Garcia', email: 'maria@garcia.fund', firm: 'Garcia Impact Fund', investmentRange: { min: 100000, max: 1000000 }, industries: ['CleanTech', 'Social Impact', 'Sustainability'], bio: 'Impact investor supporting sustainable and social enterprises', avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=14b8a6&color=fff', portfolio: ['SolarGrid', 'GreenPack', 'ReCircle'], totalInvestments: 28 }
];

module.exports = async () => {
  try {
    if ((await Mentor.countDocuments()) === 0) await Mentor.insertMany(mentorsData);
    if ((await Investor.countDocuments()) === 0) await Investor.insertMany(investorsData);
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};