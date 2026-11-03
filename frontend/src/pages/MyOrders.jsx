// frontend/src/pages/MyOrders.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Package, Calendar, Clock, ShoppingBag, ArrowRight, CheckCircle2, Truck } from 'lucide-react';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center text-slate-500 font-medium">
        กำลังโหลดรายการคำสั่งซื้อ...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumb */}
      <div className="text-xs text-slate-500 mb-6 flex items-center gap-1.5 font-medium">
        <Link to="/" className="hover:text-blue-600">หน้าแรก</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold">ประวัติการสั่งซื้อของฉัน</span>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-blue-600 rounded-full inline-block"></span>
            รายการคำสั่งซื้อของฉัน
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            ตรวจสอบสถานะสินค้าและประวัติการสั่งซื้อทั้งหมดที่คุณเคยทำรายการ
          </p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm max-w-md mx-auto">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">ยังไม่มีประวัติการสั่งซื้อ</h2>
          <p className="text-xs text-slate-500 mb-6">คุณยังไม่ได้ทำรายการสั่งซื้อสินค้าใดๆ บน NEXUS IT</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm"
          >
            ไปที่หน้าเลือกซื้อสินค้า <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-slate-300 transition"
            >
              {/* แถบหัวคำสั่งซื้อ */}
              <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-slate-500">รหัสคำสั่งซื้อ: </span>
                    <span className="font-mono font-bold text-slate-900">#{order.id}</span>
                  </div>
                  <div className="text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{formatDate(order.created_at)}</span>
                  </div>
                </div>

                {/* ป้ายสถานะ */}
                <div>
                  {order.status === 'shipped' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      <Truck className="w-3.5 h-3.5" /> จัดส่งเรียบร้อยแล้ว
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ชำระเงินแล้ว / เตรียมจัดส่ง
                    </span>
                  )}
                </div>
              </div>

              {/* รายการสินค้าในออเดอร์ */}
              <div className="p-4 divide-y divide-slate-100">
                {order.items?.map((item) => (
                  <div key={item.id} className="py-3.5 flex items-center gap-4 first:pt-1 last:pb-1">
                    <img
                      src={item.image_url || 'https://via.placeholder.com/80'}
                      alt={item.product_name}
                      className="w-14 h-14 object-contain rounded-xl bg-slate-50 border border-slate-200 p-1 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium inline-block mb-1">
                        {item.category}
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                        {item.product_name}
                      </h4>
                      <div className="text-xs text-slate-500 mt-0.5">
                        จำนวน: <span className="font-bold text-slate-800">{item.quantity}</span> ชิ้น × ฿{parseFloat(item.price).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-rose-600">
                        ฿{(parseFloat(item.price) * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ส่วนท้ายออเดอร์: ยอดรวม */}
              <div className="bg-slate-50/50 p-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">ยอดชำระสุทธิ (รวมภาษีมูลค่าเพิ่มและค่าจัดส่ง)</span>
                <div className="text-base font-black text-rose-600">
                  ฿{parseFloat(order.total_amount).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
