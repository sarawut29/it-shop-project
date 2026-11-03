// frontend/src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import BrandLogo from '../components/BrandLogo';
import { LogIn, AlertCircle, ShieldCheck, UserCheck } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token, res.data.user);
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'การเข้าสู่ระบบล้มเหลว');
    } finally {
      setLoading(false);
    }
  };

  const fillAccount = (testEmail, testPassword) => {
    setEmail(testEmail);
    setPassword(testPassword);
    setError('');
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
        
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <BrandLogo size="large" />
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-2">เข้าสู่ระบบสมาชิก</h2>
          <p className="text-xs text-slate-500 mt-1">ยินดีต้อนรับเข้าสู่ศูนย์บริการอุปกรณ์ไอทีครบวงจร</p>
        </div>

        {/* 🌟 กล่องแสดงบัญชีสำหรับทดสอบ (Demo Accounts) 🌟 */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
          <div className="text-[11px] font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1.5">
            🔑 บัญชีสำหรับทดสอบระบบ (คลิกเพื่อกรอกอัตโนมัติ)
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* บัญชี Admin */}
            <button
              type="button"
              onClick={() => fillAccount('admin@itshop.com', 'admin123')}
              className="text-left p-2.5 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-xl transition shadow-sm group"
            >
              <div className="flex items-center gap-1 font-bold text-amber-700 text-xs mb-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> แอดมิน (Admin)
              </div>
              <div className="text-[11px] text-slate-700 font-mono truncate">admin@itshop.com</div>
              <div className="text-[10px] text-slate-400">รหัสผ่าน: <span className="font-mono text-slate-800 font-bold">admin123</span></div>
            </button>

            {/* บัญชี Member */}
            <button
              type="button"
              onClick={() => fillAccount('member@itshop.com', 'member123')}
              className="text-left p-2.5 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl transition shadow-sm group"
            >
              <div className="flex items-center gap-1 font-bold text-blue-700 text-xs mb-0.5">
                <UserCheck className="w-3.5 h-3.5 text-blue-600" /> สมาชิก (Member)
              </div>
              <div className="text-[11px] text-slate-700 font-mono truncate">member@itshop.com</div>
              <div className="text-[10px] text-slate-400">รหัสผ่าน: <span className="font-mono text-slate-800 font-bold">member123</span></div>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">อีเมลผู้ใช้งาน</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition"
              placeholder="user@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">รหัสผ่าน</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md shadow-blue-500/20"
          >
            <LogIn className="w-4 h-4" />
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          ยังไม่มีบัญชีสมาชิก?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-bold">
            สมัครสมาชิกใหม่ที่นี่
          </Link>
        </p>
      </div>
    </div>
  );
}
