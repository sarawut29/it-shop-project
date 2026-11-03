// frontend/src/pages/Cart.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { Trash2, ShoppingBag, CheckCircle, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const [successOrder, setSuccessOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const payload = {
        items: cart.map(item => ({ product_id: item.id, quantity: item.quantity }))
      };
      const res = await api.post('/orders', payload);
      setSuccessOrder(res.data.order);
      clearCart();
    } catch (err) {
      setError(err.response?.data?.message || 'การสั่งซื้อล้มเหลว');
    } finally {
      setLoading(false);
    }
  };

  if (successOrder) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-2xl border border-slate-200 text-center shadow-sm">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">สั่งซื้อสินค้าสำเร็จเรียบร้อย!</h2>
        <p className="text-xs text-slate-600 mb-6 leading-relaxed">
          รหัสคำสั่งซื้อ <span className="font-bold text-slate-900">#{successOrder.id}</span> ได้รับการบันทึกลงในระบบ และระบบได้ทำการตัดสต็อกสินค้าในคลังสินค้าเรียบร้อยแล้ว
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition"
        >
          กลับไปเลือกซื้อสินค้าต่อ <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-2xl border border-slate-200 text-center shadow-sm">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">ไม่มีสินค้าในตะกร้า</h2>
        <p className="text-xs text-slate-500 mb-6">คุณยังไม่ได้เลือกสินค้าลงในตะกร้าสินค้า</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm"
        >
          เลือกซื้อสินค้าเลย
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
        <span className="w-2.5 h-6 bg-blue-600 rounded-full inline-block"></span>
        ตะกร้าสินค้าของคุณ ({cart.length} รายการ)
      </h1>

      {error && (
        <div className="p-4 mb-6 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* รายการสินค้าในตะกร้า */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"
            >
              <img
                src={item.image_url || 'https://via.placeholder.com/100'}
                alt={item.name}
                className="w-20 h-20 object-contain rounded-xl bg-slate-50 border border-slate-100 p-2 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                  {item.category}
                </span>
                <h3 className="font-bold text-slate-900 text-sm mt-1 truncate">{item.name}</h3>
                <div className="text-rose-600 font-extrabold text-sm mt-1">
                  ฿{parseFloat(item.price).toLocaleString()}
                </div>
              </div>

              {/* ปุ่มเพิ่มลดจำนวน */}
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-7 h-7 bg-white text-slate-700 rounded-lg font-bold shadow-sm hover:bg-slate-50 transition"
                >
                  -
                </button>
                <span className="text-xs font-bold text-slate-900 px-2">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 bg-white text-slate-700 rounded-lg font-bold shadow-sm hover:bg-slate-50 transition"
                >
                  +
                </button>
              </div>

              {/* ปุ่มลบ */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                title="ลบออกจากตะกร้า"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* สรุปยอดเงิน */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            สรุปยอดคำสั่งซื้อ
          </h2>
          
          <div className="flex justify-between text-xs text-slate-600">
            <span>มูลค่าสินค้า</span>
            <span className="font-semibold text-slate-800">฿{cartTotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-emerald-600" /> ค่าจัดส่งมาตรฐาน
            </span>
            <span className="text-emerald-600 font-bold">ฟรี</span>
          </div>

          <div className="flex justify-between text-sm font-bold text-slate-900 border-t border-slate-100 pt-3">
            <span>ยอดชำระสุทธิ</span>
            <span className="text-xl font-black text-rose-600">฿{cartTotal.toLocaleString()}</span>
          </div>

          <div className="pt-2">
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition text-sm shadow-md shadow-blue-500/20"
            >
              {loading
                ? 'กำลังประมวลผลคำสั่งซื้อ...'
                : user
                ? 'ยืนยันการสั่งซื้อสินค้า'
                : 'เข้าสู่ระบบเพื่อดำเนินการสั่งซื้อ'}
            </button>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> มั่นใจได้ ปลอดภัย 100%
            </div>
            <div>สินค้ารับประกันศูนย์ไทย ออกใบกำกับภาษีได้</div>
          </div>
        </div>

      </div>
    </div>
  );
}
