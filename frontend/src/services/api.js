import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

export const mentorAPI = {
  getAll: () => api.get('/mentors'),
  getById: (id) => api.get(`/mentors/${id}`),
  requestMentorship: (id, message) => api.post(`/mentors/${id}/request`, { message }),
  getMyRequests: () => api.get('/mentors/requests/my'),
};

export const investorAPI = {
  getAll: () => api.get('/investors'),
  getById: (id) => api.get(`/investors/${id}`),
  expressInterest: (id) => api.post(`/investors/${id}/interest`),
};

export const loanAPI = {
  apply: (loanData) => api.post('/loans/apply', loanData),
  getMyLoans: () => api.get('/loans/my'),
  getById: (id) => api.get(`/loans/${id}`),
};

export const aiAPI = {
  chat: (message, history) => api.post('/ai/chat', { message, history }),
  getSuggestions: () => api.get('/ai/suggestions'),
};

export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getRecentActivity: () => api.get('/dashboard/recent-activity'),
};

export default api;