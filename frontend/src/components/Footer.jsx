// frontend/src/components/Footer.jsx
import React from 'react';
import BrandLogo from './BrandLogo';
import { Cpu, Phone, Mail, MapPin, ShieldCheck, Truck, Headphones, RotateCcw, Award, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs mt-16">
      
      {/* ส่วนแถบการันตี 4 ข้อหลัก สไตล์ Advice / JIB */}
      <div className="border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">จัดส่งด่วนทั่วประเทศ</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">จัดส่งปลอดภัย ห่อกันกระแทกอย่างดี</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">ประกันศูนย์ไทยแท้ 100%</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">รับประกันโดยตรงจากผู้ผลิตแบรนด์ชั้นนำ</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">เปลี่ยนตัวใหม่ใน 7 วัน</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">กรณีสินค้ามีปัญหาจากการผลิต</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">บริการหลังการขาย</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">ทีมช่างเทคนิคผู้เชี่ยวชาญให้คำปรึกษาฟรี</p>
            </div>
          </div>
        </div>
      </div>

      {/* ส่วนรายละเอียดข้อมูลบริษัททางการ */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* ข้อมูลบริษัทและสโลแกน */}
        <div className="space-y-3.5">
          <BrandLogo />
          <p className="text-slate-500 leading-relaxed text-[11px]">
            บริษัท เน็กซัส ไอที โซลูชั่นส์ จำกัด (มหาชน)<br />
            ตัวแทนจัดจำหน่ายคอมพิวเตอร์ โน้ตบุ๊ก อุปกรณ์เสริม และเกมมิ่งเกียร์ครบวงจร มุ่งเน้นคุณภาพสินค้าและบริการที่เหนือระดับ
          </p>
          <div className="text-[10px] text-slate-400">
            เลขทะเบียนพาณิชย์: 0105567890123
          </div>
        </div>

        {/* หมวดหมู่สินค้า */}
        <div>
          <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">
            หมวดหมู่สินค้าไอที
          </h4>
          <ul className="space-y-2 text-slate-500 text-[11px]">
            <li className="hover:text-blue-600 cursor-pointer">เกมมิ่งโน้ตบุ๊ก & อัลตร้าบุ๊ก</li>
            <li className="hover:text-blue-600 cursor-pointer">คีย์บอร์ดแมคคานิคอล (Custom Keyboards)</li>
            <li className="hover:text-blue-600 cursor-pointer">เมาส์เกมมิ่งน้ำหนักเบา (Esports Mouse)</li>
            <li className="hover:text-blue-600 cursor-pointer">จอมอนิเตอร์สำหรับทำงานและเล่นเกม</li>
            <li className="hover:text-blue-600 cursor-pointer">ซีพียูและการ์ดจอประสิทธิภาพสูง</li>
          </ul>
        </div>

        {/* บริการลูกค้า */}
        <div>
          <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">
            ศูนย์บริการลูกค้า
          </h4>
          <ul className="space-y-2 text-slate-500 text-[11px]">
            <li className="hover:text-blue-600 cursor-pointer">วิธีการสั่งซื้อและการชำระเงิน</li>
            <li className="hover:text-blue-600 cursor-pointer">ตรวจสอบและติดตามสถานะพัสดุ</li>
            <li className="hover:text-blue-600 cursor-pointer">นโยบายการรับประกันและการเคลมสินค้า</li>
            <li className="hover:text-blue-600 cursor-pointer">ติดต่อขอใบกำกับภาษีเต็มรูปแบบ</li>
            <li className="hover:text-blue-600 cursor-pointer">เงื่อนไขการคืนเงินและเปลี่ยนสินค้า</li>
          </ul>
        </div>

        {/* ข้อมูลติดต่อ */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">
            ติดต่อเรา
          </h4>
          <div className="flex items-start gap-2.5 text-[11px] text-slate-500">
            <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>เลขที่ 888 อาคารเน็กซัสทาวเวอร์ ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900</span>
          </div>
          <div className="flex items-center gap-2.5 text-[11px] text-slate-500">
            <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>02-123-4567 (ทุกวัน 09:00 - 19:00 น.)</span>
          </div>
          <div className="flex items-center gap-2.5 text-[11px] text-slate-500">
            <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>contact@nexusit.co.th</span>
          </div>
        </div>

      </div>

      {/* ส่วนลิขสิทธิ์และโลโก้ระบบชำระเงิน */}
      <div className="border-t border-slate-200 bg-slate-50 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © 2026 NEXUS IT SOLUTIONS CO., LTD. ALL RIGHTS RESERVED. (PROJECT WORK)
          </div>
          <div className="flex items-center gap-3 text-slate-500 text-xs font-semibold">
            <span>ช่องทางชำระเงิน:</span>
            <span className="bg-white px-2 py-0.5 rounded border border-slate-200">พร้อมเพย์ PromptPay</span>
            <span className="bg-white px-2 py-0.5 rounded border border-slate-200">บัตรเครดิต/เดบิต</span>
            <span className="bg-white px-2 py-0.5 rounded border border-slate-200">โอนผ่านธนาคาร</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
