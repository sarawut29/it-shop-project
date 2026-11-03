// frontend/src/pages/Register.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import BrandLogo from '../components/BrandLogo';
import { UserPlus, MailCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const [demoVerifyUrl, setDemoVerifyUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/register', formData);
      setSuccessMsg(res.data.message);
      if (res.data.verifyUrlDemo) {
        setDemoVerifyUrl(res.data.verifyUrlDemo);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'การสมัครสมาชิกล้มเหลว');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <BrandLogo size="large" />
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-2">สมัครสมาชิกใหม่</h2>
          <p className="text-xs text-slate-500 mt-1">สร้างบัญชีเพื่อสั่งซื้อและสะสมสิทธิประโยชน์</p>
        </div>

        {error && (
          <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {successMsg ? (
          <div className="space-y-4 text-center py-4">
            <div className="w-16 h-16 bg-emerald-100 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <MailCheck className="w-9 h-9" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">ตรวจสอบอีเมลของคุณ</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{successMsg}</p>
            
            {demoVerifyUrl && (
              <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs">
                <span className="text-blue-700 font-bold block mb-1">🔗 ลิงก์ยืนยันตัวตน (สำหรับทดสอบ):</span>
                <a href={demoVerifyUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all font-medium">
                  {demoVerifyUrl}
                </a>
              </div>
            )}

            <div className="pt-4">
              <Link to="/login" className="text-xs font-bold text-blue-600 hover:underline">
                กลับไปยังหน้าเข้าสู่ระบบ
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">ชื่อ-นามสกุล</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                placeholder="สมชาย สายไอที"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">อีเมลที่ใช้งานจริง</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                placeholder="somchai@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">ตั้งรหัสผ่าน</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md shadow-blue-500/20"
            >
              <UserPlus className="w-4 h-4" />
              {loading ? 'กำลังลงทะเบียน...' : 'สมัครสมาชิก'}
            </button>
          </form>
        )}

        {!successMsg && (
          <p className="text-center text-xs text-slate-500 mt-6 pt-3 border-t border-slate-100">
            มีบัญชีสมาชิกอยู่แล้ว?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-bold">
              เข้าสู่ระบบที่นี่
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
