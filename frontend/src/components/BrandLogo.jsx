// frontend/src/components/BrandLogo.jsx
import React from 'react';

// ตัวไอคอนสัญลักษณ์หลักของแบรนด์ (สามารถขยายขนาดได้ทุกขนาด)
export function BrandIcon({ className = "w-10 h-10" }) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-md shadow-blue-500/25 ${className}`}
    >
      <div className="w-full h-full bg-slate-900 rounded-[inherit] flex items-center justify-center p-[15%]">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* โครงสร้าง Hexagon นอก */}
          <path
            d="M18 3.5L31 11V25L18 32.5L5 25V11L18 3.5Z"
            stroke="url(#hex_grad_icon)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* เส้นสายตัว N ทรงโมเดิร์น */}
          <path
            d="M12.5 24V12L23.5 24V12"
            stroke="#ffffff"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* จุด Node ไฟสองฝั่ง */}
          <circle cx="12.5" cy="12" r="2.2" fill="#38bdf8" />
          <circle cx="23.5" cy="24" r="2.2" fill="#818cf8" />
          <defs>
            <linearGradient id="hex_grad_icon" x1="5" y1="3.5" x2="31" y2="32.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="0.5" stopColor="#6366f1" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

// ตัวคอมโพเนนต์โลโก้แบบเต็ม (ไอคอน + ชื่อแบรนด์)
export default function BrandLogo({ size = "default", light = false }) {
  const isLarge = size === "large";

  return (
    <div className="flex items-center gap-3 group select-none">
      
      {/* ไอคอนหลัก */}
      <BrandIcon className={isLarge ? 'w-14 h-14' : 'w-10 h-10'} />

      {/* ข้อความชื่อแบรนด์ */}
      <div>
        <div className={`font-black tracking-tight leading-none flex items-center gap-1.5 ${isLarge ? 'text-3xl' : 'text-2xl'} ${light ? 'text-white' : 'text-slate-900'}`}>
          <span>NEXUS</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-extrabold">
            TECH
          </span>
          <span className="text-[10px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold px-1.5 py-0.5 rounded-md tracking-wider uppercase shadow-xs">
            PRO
          </span>
        </div>
        <div className={`text-[10px] font-semibold tracking-widest uppercase mt-0.5 ${light ? 'text-slate-300' : 'text-slate-400'}`}>
          Ultimate IT Hardware & Systems
        </div>
      </div>

    </div>
  );
}
