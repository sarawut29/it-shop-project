// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useCart } from '../context/CartContext';
import { BrandIcon } from '../components/BrandLogo';
import { 
  ArrowRight, 
  ShoppingCart, 
  Zap, 
  ShieldCheck, 
  Laptop, 
  Keyboard, 
  Mouse, 
  Tv, 
  Cpu, 
  Sparkles,
  CheckCircle2,
  Check,
  PhoneCall
} from 'lucide-react';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [addedId, setAddedId] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get('/products')
      .then(res => setFeaturedProducts(res.data.slice(0, 4)))
      .catch(err => console.error(err));
  }, []);

  const handleAdd = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const categories = [
    { name: 'Laptop', label: 'โน้ตบุ๊ก & แล็ปท็อป', icon: Laptop, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Keyboard', label: 'คีย์บอร์ดเกมมิ่ง', icon: Keyboard, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'Mouse', label: 'เมาส์เกมมิ่งเกียร์', icon: Mouse, color: 'text-rose-600', bg: 'bg-rose-50' },
    { name: 'Monitor', label: 'จอมอนิเตอร์ 4K', icon: Tv, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  // คำนวณชื่อเดือนภาษาไทย และปี ค.ศ. ปัจจุบันแบบไดนามิกอัตโนมัติ
  const currentMonth = new Intl.DateTimeFormat('th-TH', { month: 'long' }).format(new Date());
  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-12 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      
      {/* 1. Main Hero Banner & Side Promos (สไตล์ Advice & JIB) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* แบนเนอร์หลักขนาดใหญ่ */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 border border-slate-800 text-white p-8 md:p-12 shadow-md flex flex-col justify-between min-h-[320px]">
          <div className="relative z-10 max-w-lg space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> แคมเปญพิเศษประจำเดือน {currentMonth} {currentYear}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              อัปเกรดคอมพิวเตอร์สเปกแรง <br />
              มั่นใจของแท้ <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 font-black">ประกันศูนย์ไทย 100%</span>
            </h1>
            <p className="text-slate-200 text-xs md:text-sm leading-relaxed">
              ศูนย์รวมแล็ปท็อปเกมมิ่ง อุปกรณ์เสริมฮาร์ดแวร์ และเกมมิ่งเกียร์จากแบรนด์ชั้นนำระดับโลก พร้อมบริการประกอบและจัดส่งด่วนถึงบ้านคุณ
            </p>
          </div>

          <div className="relative z-10 pt-6">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/30 transition text-sm hover:scale-[1.02]"
            >
              เลือกชมสินค้าทั้งหมด <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* แสดงสัญลักษณ์โลโก้หลักของแบรนด์ (Brand Icon) ตัวเดียวกับด้านบน พร้อมแสงออร่า */}
          <div className="hidden sm:flex absolute right-6 md:right-10 top-1/2 -translate-y-1/2 pointer-events-none items-center justify-center">
            {/* แสงออร่าสีฟ้า-ม่วงด้านหลัง */}
            <div className="absolute w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
            
            {/* โลโก้หลักตัวเต็มในขนาดใหญ่ */}
            <div className="w-48 h-48 md:w-56 md:h-56 transform rotate-3 hover:rotate-0 transition duration-500 opacity-95 drop-shadow-[0_15px_35px_rgba(37,99,235,0.4)]">
              <BrandIcon className="w-full h-full rounded-[32px] p-1.5" />
            </div>
          </div>
        </div>

        {/* แบนเนอร์ย่อยข้างๆ 2 กล่อง (สไตล์ BaNANA IT / Advice) */}
        <div className="flex flex-col gap-4">
          <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-blue-400 transition">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                PROMOTION
              </span>
              <h3 className="font-extrabold text-slate-900 text-base mt-2">
                Gaming Gear Special Deal
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                คีย์บอร์ดและเมาส์เกมมิ่ง ลดสูงสุด 25% ตลอดสัปดาห์นี้
              </p>
            </div>
            <Link to="/products?category=Keyboard" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-4">
              ดูรายการสินค้า <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white rounded-2xl p-6 border border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/20 px-2.5 py-1 rounded-full border border-cyan-500/30">
                EXPERT SERVICE
              </span>
              <h3 className="font-extrabold text-white text-base mt-2.5">
                บริการจัดสเปกคอมพิวเตอร์
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                จัดสเปกตามงบประมาณ ปรึกษาฟรีโดยทีมงานมืออาชีพ
              </p>
            </div>
            <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5 mt-4">
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
              <span>โทร 02-123-4567 ปรึกษาช่างเทคนิค</span>
            </div>
          </div>
        </div>

      </section>

      {/* 2. หมวดหมู่สินค้าด่วน (Quick Category Cards สไตล์ BaNANA IT) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-blue-600 rounded-full inline-block"></span>
            เลือกดูตามหมวดหมู่สินค้า
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to={`/products?category=${cat.name}`}
                className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3.5 hover:border-blue-500 hover:shadow-md transition group"
              >
                <div className={`w-12 h-12 ${cat.bg} ${cat.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-blue-600 transition">
                    {cat.label}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    คลิกเพื่อดูสินค้า
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. สินค้าแนะนำประจำสัปดาห์ (Featured Products Cards สไตล์ JIB & Advice) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-6 bg-rose-600 rounded-full inline-block"></span>
              สินค้าขายดี & สินค้าแนะนำ
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">สินค้าไอทีสเปกยอดนิยม พร้อมส่งด่วนทันที</p>
          </div>
          <Link
            to="/products"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition flex items-center gap-1"
          >
            ดูสินค้าทั้งหมด <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between group"
            >
              {/* ภาพสินค้า */}
              <div className="relative h-48 bg-slate-50 overflow-hidden p-4 flex items-center justify-center">
                <img
                  src={p.image_url || 'https://via.placeholder.com/400'}
                  alt={p.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 bg-white text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-200 shadow-sm">
                  {p.category}
                </span>
                <span className="absolute top-3 right-3 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                  สต็อก: {p.stock} ชิ้น
                </span>
              </div>

              {/* รายละเอียดสินค้า */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition line-clamp-2 leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400">ราคาพิเศษ</div>
                    <div className="text-lg font-black text-rose-600 leading-none">
                      ฿{parseFloat(p.price).toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAdd(p)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                      addedId === p.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {addedId === p.id ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
                    {addedId === p.id ? 'เพิ่มแล้ว' : 'ใส่ตะกร้า'}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 4. ส่วนนำเสนอข้อมูลบริษัททางการ (Company Info Section ตามเกณฑ์ข้อ 1) */}
      <section className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> เกี่ยวกับ บริษัท เน็กซัส ไอที โซลูชั่นส์ จำกัด
          </div>
          <h2 className="text-2xl font-black text-slate-900 leading-tight">
            ผู้นำด้านการจัดจำหน่ายเทคโนโลยีและอุปกรณ์ไอทีครบวงจร
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            เรามุ่งมั่นคัดสรรเฉพาะอุปกรณ์ไอทีคุณภาพสูง โน้ตบุ๊กประสิทธิภาพสูงสำหรับการทำงานและเล่นเกม 
            อุปกรณ์เกมมิ่งเกียร์ระดับอีสปอร์ต และฮาร์ดแวร์คอมพิวเตอร์ที่ผ่านการรับรองมาตรฐานสากล 
            พร้อมมอบบริการที่โปร่งใส ซื่อตรง และบริการหลังการขายที่ดูแลลูกค้าเสมือนคนในครอบครัว
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> รับประกันสินค้าของแท้ 100%
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> ออกใบกำกับภาษีเต็มรูปแบบได้
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> จัดส่งครอบคลุมทั่วประเทศ
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
