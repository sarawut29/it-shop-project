// frontend/src/pages/Products.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';
import { useCart } from '../context/CartContext';
import { Search, ShoppingCart, Check, Filter, Layers, CheckCircle2 } from 'lucide-react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [addedId, setAddedId] = useState(null);
  const { addToCart } = useCart();
  const location = useLocation();

  const categories = [
    { id: 'All', label: 'สินค้าทั้งหมด' },
    { id: 'Laptop', label: 'โน้ตบุ๊ก & แล็ปท็อป' },
    { id: 'Keyboard', label: 'คีย์บอร์ดเกมมิ่ง' },
    { id: 'Mouse', label: 'เมาส์เกมมิ่ง' },
    { id: 'Monitor', label: 'จอมอนิเตอร์' },
  ];

  // อ่าน Query Params จาก URL (กรณีคลิกมาจาก Navbar เช่น ?category=Laptop หรือ ?search=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catParam = params.get('category');
    const searchParam = params.get('search');
    if (catParam) setCategory(catParam);
    if (searchParam) setSearch(searchParam);
  }, [location.search]);

  useEffect(() => {
    let url = '/products';
    const params = [];
    if (category !== 'All') params.push(`category=${category}`);
    if (search.trim()) params.push(`search=${encodeURIComponent(search)}`);
    if (params.length > 0) url += `?${params.join('&')}`;

    api.get(url).then(res => setProducts(res.data)).catch(err => console.error(err));
  }, [category, search]);

  const handleAdd = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumb แถบนำทาง */}
      <div className="text-xs text-slate-500 mb-6 flex items-center gap-1.5 font-medium">
        <span>หน้าแรก</span>
        <span>/</span>
        <span className="text-slate-800 font-bold">สินค้าทั้งหมด</span>
        {category !== 'All' && (
          <>
            <span>/</span>
            <span className="text-blue-600 font-bold">{category}</span>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* คอลัมน์ซ้าย: ตัวกรองหมวดหมู่สินค้า (Sidebar กรองสินค้าสไตล์ JIB & Advice) */}
        <aside className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="font-extrabold text-slate-900 text-sm mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Filter className="w-4 h-4 text-blue-600" /> หมวดหมู่สินค้า
            </h3>

            <div className="space-y-1.5">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
                    category === c.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{c.label}</span>
                  {category === c.id && <CheckCircle2 className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 space-y-2">
            <div className="font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> รับประกันของแท้ 100%
            </div>
            <p className="text-[11px] text-blue-700 leading-relaxed">
              สินค้าทุกรายการผ่านการตรวจสอบมาตรฐาน QC และมีประกันศูนย์ไทยรองรับทุกชิ้น
            </p>
          </div>
        </aside>

        {/* คอลัมน์ขวา: รายการสินค้าและช่องค้นหา */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* แถบหัวข้อ + ค้นหาด่วน */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-black text-slate-900">
                {category === 'All' ? 'รายการสินค้าทั้งหมด' : `หมวดหมู่: ${category}`}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">พบสินค้าพร้อมจำหน่าย {products.length} รายการ</p>
            </div>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="ค้นหาในหมวดนี้..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-800 pl-9 pr-3 py-2 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white transition"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* รายการการ์ดสินค้า (Product Cards สไตล์ขาวคลีน) */}
          {products.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
              <Layers className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="text-sm font-semibold">ไม่พบรายการสินค้าที่ตรงกับเงื่อนไขการค้นหา</p>
              <button
                onClick={() => { setCategory('All'); setSearch(''); }}
                className="mt-3 text-xs text-blue-600 font-bold hover:underline"
              >
                ล้างตัวกรองทั้งหมด
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-blue-400 transition-all flex flex-col justify-between group"
                >
                  <div className="relative h-52 bg-slate-50 overflow-hidden p-4 flex items-center justify-center">
                    <img
                      src={p.image_url || 'https://via.placeholder.com/400'}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-white text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-200 shadow-sm">
                      {p.category}
                    </span>
                    <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-md border shadow-sm ${
                      p.stock > 0
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {p.stock > 0 ? `สต็อก: ${p.stock}` : 'สินค้าหมด'}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition line-clamp-2 leading-snug">
                        {p.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-end justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">ราคาพิเศษ</div>
                        <div className="text-xl font-black text-rose-600 leading-none">
                          ฿{parseFloat(p.price).toLocaleString()}
                        </div>
                      </div>

                      <button
                        disabled={p.stock <= 0}
                        onClick={() => handleAdd(p)}
                        className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm ${
                          p.stock <= 0
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                            : addedId === p.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {addedId === p.id ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
                        {p.stock <= 0 ? 'หมดชั่วคราว' : addedId === p.id ? 'เพิ่มแล้ว!' : 'ใส่ตะกร้า'}
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
