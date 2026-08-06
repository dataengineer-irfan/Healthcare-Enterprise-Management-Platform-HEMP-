import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App';

// Default to deployed Render backend URL if not explicitly set
const backendUrl = import.meta.env.VITE_API_URL || 'https://hemp-demo-backend.onrender.com';
axios.defaults.baseURL = backendUrl;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
