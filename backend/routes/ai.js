const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const axios = require('axios');

const router = express.Router();

function getMockAIResponse(userMessage, userContext) {
  const msg = userMessage.toLowerCase();
  const responses = {
    marketing: "Based on your startup stage, I recommend focusing on content marketing and social media engagement. Create valuable content that addresses your target audience's pain points. Consider running targeted ads on LinkedIn or Twitter depending on your B2B/B2C focus.",
    funding: `Great question about funding! For a startup in ${userContext.stage} stage with ${userContext.industry} industry, consider these options:\n1. Bootstrapping - retain full control\n2. Angel investors - good for $25k-$100k\n3. Venture capital - for scaling beyond $500k\n4. Our platform's business loans - quick access up to $100k\n\nWould you like me to analyze your specific funding needs?`,
    product: "To build a successful product, focus on solving one core problem exceptionally well. Use the MVP approach - launch quickly, gather feedback, iterate. Consider conducting user interviews with at least 20 potential customers before full development.",
    team: "Building the right team is crucial. Look for complementary skills (technical + business). Consider offering equity to early employees. Use platforms like LinkedIn and AngelList. Culture fit matters as much as technical skills.",
    growth: "For growth, focus on customer acquisition cost (CAC) and lifetime value (LTV). Aim for LTV > 3x CAC. Implement referral programs, optimize conversion funnels, and consider partnerships in your industry.",
    pitch: "Your pitch deck should have: Problem, Solution, Market Size, Product, Traction, Team, Financials, Ask. Keep it under 12 slides. Practice your 60-second elevator pitch. Highlight your unique value proposition clearly.",
    loan: `Based on your startup (${userContext.startupName || 'your startup'}), a business loan could accelerate growth. Our platform offers competitive rates. Consider applying for $10,000-$50,000 for product development or marketing. I can help you prepare a loan application.`,
    mentor: "I recommend connecting with mentors who have experience in your industry. On our platform, you can find mentors specializing in marketing, product, fundraising, and operations. Send personalized requests explaining what specific guidance you need.",
    investor: "To attract investors, demonstrate traction (users, revenue, partnerships). Build a strong pitch deck and financial model. Our investor network includes angels and VCs interested in various stages. Would you like me to suggest matching investors based on your industry?"
  };
  for (const [key, response] of Object.entries(responses)) {
    if (msg.includes(key)) return response;
  }
  return `I'm your AI startup assistant! I can help you with:\n• Marketing strategies\n• Funding and investment advice\n• Product development tips\n• Team building\n• Growth hacking\n• Pitch deck preparation\n• Business loan guidance\n• Mentor/investor connections\n\nWhat specific area would you like help with today? Based on your ${userContext.stage} stage startup in ${userContext.industry || 'general'} industry, I'm ready to provide personalized advice!`;
}

router.post('/chat', auth, async (req, res) => {
  try {
    const { message, history } = req.body;
    const user = await User.findById(req.user.id);
    const userContext = { startupName: user.startupName || 'your startup', industry: user.industry || 'technology', stage: user.stage || 'idea', fundingGoal: user.fundingGoal || 0 };
    let aiResponse;
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_optional') {
      try {
        const openaiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'system', content: `You are an AI startup advisor helping a founder. Their startup: ${userContext.startupName}, Industry: ${userContext.industry}, Stage: ${userContext.stage}. Provide concise, actionable advice.` }, ...history, { role: 'user', content: message }],
          max_tokens: 500,
          temperature: 0.7
        }, { headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' } });
        aiResponse = openaiResponse.data.choices[0].message.content;
      } catch (openaiErr) {
        aiResponse = getMockAIResponse(message, userContext);
      }
    } else {
      aiResponse = getMockAIResponse(message, userContext);
    }
    res.json({ response: aiResponse });
  } catch (err) {
    res.status(500).json({ message: 'AI service error', error: err.message });
  }
});

router.get('/suggestions', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const suggestions = [];
    if (user.stage === 'idea') {
      suggestions.push({ type: 'action', title: 'Validate Your Idea', description: 'Conduct customer interviews with at least 30 potential users to validate your problem-solution fit.', priority: 'high' });
      suggestions.push({ type: 'resource', title: 'Build Your MVP', description: 'Focus on creating a minimum viable product with core features only. Use no-code tools if possible.', priority: 'high' });
    } else if (user.stage === 'mvp') {
      suggestions.push({ type: 'action', title: 'Gather User Feedback', description: 'Collect feedback from early users and iterate quickly based on their insights.', priority: 'high' });
      suggestions.push({ type: 'funding', title: 'Apply for Seed Funding', description: 'Consider our business loan or connect with angel investors on our platform.', priority: 'medium' });
    } else if (user.stage === 'growth') {
      suggestions.push({ type: 'marketing', title: 'Scale Your Marketing', description: 'Invest in paid acquisition channels that show positive ROI.', priority: 'high' });
    }
    suggestions.push({ type: 'mentor', title: 'Connect with a Mentor', description: 'Our experienced mentors can provide guidance specific to your industry challenges.', priority: 'medium' });
    suggestions.push({ type: 'loan', title: 'Business Loan Available', description: 'You may qualify for a business loan up to $100,000 with competitive rates.', priority: 'low' });
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;