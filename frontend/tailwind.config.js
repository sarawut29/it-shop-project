/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Prompt', 'sans-serif'],
      },
      colors: {
        retail: {
          blue: '#1d4ed8',     // น้ำเงินทางการ (Corporate Blue สไตล์ Advice / JIB)
          red: '#e11d48',      // สีแดงสำหรับป้ายราคา / โปรโมชั่น (สไตล์ ihavecpu / JIB)
          orange: '#ea580c',   // สีส้มแอคเซนต์
          yellow: '#f59e0b',   // สีเหลือง BaNANA IT
          dark: '#0f172a',     // ข้อความสีเข้ม
          gray: '#f8fafc',     // พื้นหลังสะอาดตา
        }
      }
    },
  },
  plugins: [],
}
