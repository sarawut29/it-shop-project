// frontend/src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import BrandLogo from './BrandLogo';
import { 
  ShoppingCart, 
  User, 
  LogOut, 
  ShieldCheck, 
  Menu, 
  X, 
  Search, 
  PhoneCall, 
  Truck, 
  Shield, 
  Cpu,
  Layers,
  Sparkles,
  Package
} from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount, cartTotal } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
      
      {/* 1. แถบข้อมูลบนสุด (Top Announcement Bar สไตล์ JIB & Advice) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Truck className="w-3.5 h-3.5 text-emerald-400" /> บริการจัดส่งด่วนทั่วไทย ปลอดภัย มั่นใจได้ 100%
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Shield className="w-3.5 h-3.5 text-cyan-400" /> สินค้าของแท้ มีประกันศูนย์ทุกชิ้น
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1 text-slate-300">
              <PhoneCall className="w-3 h-3 text-amber-400" /> สายด่วน: 02-123-4567
            </span>
            <span>|</span>
            <span className="hover:text-white cursor-pointer">เช็คสถานะการจัดส่ง</span>
            <span>|</span>
            <span className="hover:text-white cursor-pointer">สาขาที่ให้บริการ</span>
          </div>
        </div>
      </div>

      {/* 2. แถบหลัก (Main Header): Logo + ช่องค้นหาใหญ่ตรงกลาง + ตะกร้า & บัญชีผู้ใช้ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          
          {/* Logo บริษัทไอทีระดับมืออาชีพ */}
          <Link to="/" className="flex-shrink-0">
            <BrandLogo />
          </Link>

          {/* ช่องค้นหาขนาดใหญ่ตรงกลาง (สไตล์ Advice / Banana / JIB) */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl relative">
            <input
              type="text"
              placeholder="ค้นหาโน้ตบุ๊ก, จอมอนิเตอร์, เมาส์, คีย์บอร์ด หรือสินค้าไอที..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-800 text-sm pl-4 pr-12 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition shadow-sm"
              title="ค้นหา"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* ส่วนผู้ใช้งานและตะกร้าสินค้า */}
          <div className="flex items-center gap-3 sm:gap-5">

            {/* ปุ่มเข้าสู่ระบบ / บัญชีผู้ใช้ */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <div className="text-xs font-bold text-slate-800 flex items-center justify-end gap-1">
                    {user.role === 'admin' ? (
                      <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-extrabold uppercase">Admin</span>
                    ) : (
                      <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Member</span>
                    )}
                    {user.name}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">{user.email}</div>
                </div>

                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 text-xs font-semibold px-3 py-2 rounded-xl transition shadow-sm"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span className="hidden md:inline">แผงแอดมิน</span>
                  </Link>
                ) : (
                  <Link
                    to="/my-orders"
                    className="flex items-center gap-1.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 text-xs font-semibold px-3 py-2 rounded-xl transition shadow-sm"
                    title="ดูประวัติการสั่งซื้อของฉัน"
                  >
                    <Package className="w-4 h-4 text-blue-600" />
                    <span className="hidden md:inline">คำสั่งซื้อของฉัน</span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  title="ออกจากระบบ"
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl border border-slate-200 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-600 px-3 py-2 rounded-xl hover:bg-slate-100 transition"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  to="/register"
                  className="text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl shadow-md shadow-blue-500/20 transition"
                >
                  สมัครสมาชิก
                </Link>
              </div>
            )}

            {/* ตะกร้าสินค้าสไตล์ร้านไอที (กล่องแสดงจำนวนและยอดเงิน) */}
            <Link
              to="/cart"
              className="flex items-center gap-2.5 bg-slate-50 hover:bg-blue-50/60 p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 hover:border-blue-300 transition group"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-slate-700 group-hover:text-blue-600 transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-600 text-white font-extrabold text-[10px] rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-[10px] text-slate-500 leading-none">ตะกร้าสินค้า</div>
                <div className="text-xs font-extrabold text-blue-600 leading-tight">
                  ฿{cartTotal.toLocaleString()}
                </div>
              </div>
            </Link>

            {/* ปุ่มเมนูสำหรับหน้าจอมือถือ */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* ช่องค้นหาสำหรับหน้าจอมือถือ */}
        <form onSubmit={handleSearch} className="mt-3 md:hidden relative">
          <input
            type="text"
            placeholder="ค้นหาอุปกรณ์ไอที..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 text-slate-800 text-sm pl-4 pr-10 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
          />
          <button type="submit" className="absolute right-2 top-2 p-1 text-slate-500">
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* 3. แถบหมวดหมู่ย่อย (Sub-Navigation Bar สไตล์ Banana & Advice) */}
      <div className="bg-slate-50 border-t border-slate-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 text-xs font-semibold text-slate-700 h-10">
            <Link to="/" className="hover:text-blue-600 flex items-center gap-1.5 transition">
              หน้าแรก
            </Link>
            <Link to="/products" className="hover:text-blue-600 flex items-center gap-1.5 transition">
              <Layers className="w-3.5 h-3.5 text-blue-600" /> สินค้าทั้งหมด
            </Link>
            <Link to="/products?category=Laptop" className="hover:text-blue-600 transition">
              โน้ตบุ๊ก & แล็ปท็อป
            </Link>
            <Link to="/products?category=Keyboard" className="hover:text-blue-600 transition">
              คีย์บอร์ดแมคคานิคอล
            </Link>
            <Link to="/products?category=Mouse" className="hover:text-blue-600 transition">
              เมาส์เกมมิ่ง
            </Link>
            <Link to="/products?category=Monitor" className="hover:text-blue-600 transition">
              จอมอนิเตอร์
            </Link>
            <span className="text-rose-600 font-bold flex items-center gap-1 ml-auto">
              <Sparkles className="w-3.5 h-3.5" /> ดีลเด็ดลดพิเศษประจำเดือน
            </span>
          </div>
        </div>
      </div>

      {/* เมนู Dropdown บนมือถือ */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2 text-sm shadow-lg">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium hover:text-blue-600">หน้าแรก</Link>
          <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium hover:text-blue-600">สินค้าทั้งหมด</Link>
          <Link to="/products?category=Laptop" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-slate-600 text-xs pl-3">โน้ตบุ๊ก & แล็ปท็อป</Link>
          <Link to="/products?category=Keyboard" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-slate-600 text-xs pl-3">คีย์บอร์ดเกมมิ่ง</Link>
          <Link to="/products?category=Monitor" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-slate-600 text-xs pl-3">จอมอนิเตอร์</Link>
          {user && !isAdmin && (
            <Link to="/my-orders" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-blue-600 font-bold bg-blue-50 px-2 rounded-lg">
              📦 คำสั่งซื้อของฉัน (My Orders)
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-amber-700 font-bold bg-amber-50 px-2 rounded-lg">
              🛡️ แผงควบคุมแอดมิน (Admin Panel)
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
