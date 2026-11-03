// backend/db.js
const { Pool } = require('pg');
require('dotenv').config();

// สร้าง Connection Pool เพื่อเชื่อมต่อไปยัง PostgreSQL บน Supabase
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// ฟังก์ชันทดสอบการเชื่อมต่อ
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ เชื่อมต่อฐานข้อมูล Supabase ล้มเหลว:', err.message);
  }
  console.log('✅ เชื่อมต่อฐานข้อมูล Supabase (PostgreSQL) สำเร็จเรียบร้อย!');
  release();
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};