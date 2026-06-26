import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: (username, email, password) =>
    API.post('/auth/register', { username, email, password }),
  login: (email, password) =>
    API.post('/auth/login', { email, password }),
  getCurrentUser: () => API.get('/auth/me')
};

// Chat endpoints
export const chatAPI = {
  getRooms: () => API.get('/chat/rooms'),
  createRoom: (name, description, isPrivate) =>
    API.post('/chat/rooms', { name, description, isPrivate }),
  joinRoom: (roomId) => API.post(`/chat/rooms/${roomId}/join`),
  getRoomMessages: (roomId) => API.get(`/chat/rooms/${roomId}/messages`),
  getDirectMessages: (userId) => API.get(`/chat/messages/direct/${userId}`),
  getUsers: () => API.get('/chat/users'),
  getNotifications: () => API.get('/chat/notifications'),
  markNotificationAsRead: (notificationId) =>
    API.put(`/chat/notifications/${notificationId}/read`)
};

export default API;
