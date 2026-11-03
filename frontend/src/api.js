// frontend/src/api.js
import axios from 'axios';

const api = axios.create({
  // รองรับทั้งตอนรันบนเครื่อง (localhost) และตอนขึ้น Cloud (Vercel)
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// ดึง JWT Token จาก LocalStorage แนบไปกับ Header ทุก Request อัตโนมัติ
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('it_shop_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
