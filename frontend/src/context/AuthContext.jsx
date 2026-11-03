// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('it_shop_token') || null);
  const [loading, setLoading] = useState(true);

  // ตรวจสอบสถานะล็อกอินเดิมเมื่อเปิดเว็บขึ้นมา
  useEffect(() => {
    const fetchMe = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data);
        } catch (err) {
          console.error('Session หมดอายุหรือไม่ถูกต้อง');
          logout();
        }
      }
      setLoading(false);
    };
    fetchMe();
  }, [token]);

  // ฟังก์ชัน Login
  const login = (tokenData, userData) => {
    localStorage.setItem('it_shop_token', tokenData);
    setToken(tokenData);
    setUser(userData);
  };

  // ฟังก์ชัน Logout
  const logout = () => {
    localStorage.removeItem('it_shop_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);