// frontend/src/api.js
import axios from 'axios';

// ตรวจสอบว่ากำลังรันบน localhost หรือบน Vercel Cloud
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const api = axios.create({
  // ถ้ารันบนเครื่องตัวเองให้ชี้ไปที่พอร์ต 5000, ถ้าอยู่บน Vercel ให้เรียก /api บนโดเมนเดียวกันทันที
  baseURL: isLocalhost ? 'http://localhost:5000/api' : '/api',
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
