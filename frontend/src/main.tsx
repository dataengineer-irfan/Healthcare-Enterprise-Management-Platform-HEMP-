import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App';

// Default to deployed Render backend URL if not explicitly set
const backendUrl = import.meta.env.VITE_API_URL || 'https://hemp-demo-backend.onrender.com';
axios.defaults.baseURL = backendUrl;

// Request Interceptor: Automatically attach Bearer token from localStorage
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('hemp_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Response Interceptor: Automatically handle 401 Unauthorized
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      if (!window.location.pathname.includes('/login')) {
        localStorage.removeItem('hemp_token');
        localStorage.removeItem('hemp_user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
