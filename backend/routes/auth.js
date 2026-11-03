// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const db = require('../db');
const { verifyToken } = require('../middleware/auth');

// สร้างบัญชี Demo อัตโนมัติ (Admin & Member) เพื่อใช้ในการทดสอบและนำเสนอ
const seedDemoAccounts = async () => {
  try {
    const salt = await bcrypt.genSalt(10);

    // 1. ตรวจสอบและสร้าง Admin Demo
    const adminCheck = await db.query('SELECT id FROM users WHERE email = $1', ['admin@itshop.com']);
    if (adminCheck.rows.length === 0) {
      const adminPass = await bcrypt.hash('admin123', salt);
      await db.query(
        `INSERT INTO users (email, password, name, role, is_verified)
         VALUES ($1, $2, $3, $4, $5)`,
        ['admin@itshop.com', adminPass, 'Admin Nexus', 'admin', true]
      );
      console.log('✨ สร้างบัญชี Demo Admin (admin@itshop.com / admin123) สำเร็จ');
    }

    // 2. ตรวจสอบและสร้าง Member Demo
    const memberCheck = await db.query('SELECT id FROM users WHERE email = $1', ['member@itshop.com']);
    if (memberCheck.rows.length === 0) {
      const memberPass = await bcrypt.hash('member123', salt);
      await db.query(
        `INSERT INTO users (email, password, name, role, is_verified)
         VALUES ($1, $2, $3, $4, $5)`,
        ['member@itshop.com', memberPass, 'Member Somchai', 'member', true]
      );
      console.log('✨ สร้างบัญชี Demo Member (member@itshop.com / member123) สำเร็จ');
    }
  } catch (err) {
    console.error('Error seeding demo accounts:', err.message);
  }
};
seedDemoAccounts();

// ตั้งค่าตัวส่งอีเมล (Nodemailer)
// หมายเหตุ: หากยังไม่ได้ใส่ EMAIL_USER ใน .env ระบบจะจำลองการส่งและแสดงลิงก์ยืนยันที่หน้าจอ Terminal ให้ทันที
const createTransporter = () => {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return null;
};

// 1. REGISTER: สมัครสมาชิก + ส่งอีเมลยืนยันตัวตน
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }

    // ตรวจสอบว่าอีเมลนี้เคยลงทะเบียนหรือยัง
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'อีเมลนี้ถูกใช้งานไปแล้ว' });
    }

    // เข้ารหัส Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // สร้าง Token สุ่มสำหรับยืนยันอีเมล
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const userRole = 'member'; // บังคับเป็น member เมื่อสมัครผ่านหน้าเว็บ

    // บันทึกลงฐานข้อมูล (is_verified เริ่มต้นเป็น false)
    const newUser = await db.query(
      `INSERT INTO users (email, password, name, role, is_verified, verification_token)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email, name, role, is_verified`,
      [email, hashedPassword, name, userRole, false, verificationToken]
    );

    // สร้างลิงก์สำหรับกดยืนยันอีเมลแบบไดนามิก (รองรับทั้ง Vercel Cloud และ localhost)
    const host = req.get('host');
    const protocol = req.headers['x-forwarded-proto'] || (host.includes('vercel.app') ? 'https' : req.protocol);
    const verifyUrl = `${protocol}://${host}/api/auth/verify-email?token=${verificationToken}`;

    // ส่งอีเมล (หรือแสดงลิงก์ในคอนโซลสำหรับช่วงทดสอบ)
    const transporter = createTransporter();
    if (transporter) {
      await transporter.sendMail({
        from: '"IT Shop Support" <no-reply@itshop.com>',
        to: email,
        subject: 'ยืนยันการสมัครสมาชิก - IT Shop',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>ยินดีต้อนรับสู่ IT Shop, คุณ ${name}!</h2>
            <p>กรุณาคลิกลิงก์ด้านล่างเพื่อยืนยันที่อยู่อีเมลของคุณ:</p>
            <a href="${verifyUrl}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              ยืนยันอีเมลของฉัน
            </a>
            <p style="margin-top: 20px; color: #666;">หรือคัดลอกลิงก์นี้: ${verifyUrl}</p>
          </div>
        `,
      });
      console.log(`📧 ส่งอีเมลยืนยันไปที่ ${email} เรียบร้อยแล้ว`);
    } else {
      console.log(`\n========================================`);
      console.log(`📧 [โหมดจำลองส่งอีเมล] ลิงก์ยืนยันตัวตนสำหรับ ${email}:`);
      console.log(verifyUrl);
      console.log(`========================================\n`);
    }

    res.status(201).json({
      message: 'สมัครสมาชิกสำเร็จ! กรุณาตรวจสอบอีเมลเพื่อยืนยันตัวตนก่อนเข้าสู่ระบบ',
      user: newUser.rows[0],
      verifyUrlDemo: !transporter ? verifyUrl : undefined
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสมัครสมาชิก' });
  }
});

// 2. VERIFY EMAIL: เมื่อผู้ใช้คลิกลิงก์จากอีเมล
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).send('<h1>ไม่พบ Token สำหรับการยืนยัน</h1>');
    }

    // ค้นหาผู้ใช้ที่ถือ Token นี้
    const result = await db.query(
      'SELECT * FROM users WHERE verification_token = $1',
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).send('<h1>ลิงก์ยืนยันไม่ถูกต้อง หรือหมดอายุแล้ว</h1>');
    }

    // ปรับสถานะเป็นยืนยันแล้ว และลบ Token ทิ้ง
    await db.query(
      'UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE id = $1',
      [result.rows[0].id]
    );

    // ลิงก์กลับหน้าล็อกอินแบบไดนามิก
    const host = req.get('host');
    const protocol = req.headers['x-forwarded-proto'] || (host.includes('vercel.app') ? 'https' : req.protocol);
    const loginUrl = `${protocol}://${host}/login`;

    // แสดงหน้าข้อความสำเร็จแบบสวยงาม
    res.send(`
      <div style="font-family: Arial, sans-serif; text-align: center; padding-top: 60px; background-color: #f8fafc; color: #1e293b; min-height: 100vh;">
        <div style="max-width: 480px; margin: 0 auto; background: white; padding: 40px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <div style="width: 64px; height: 64px; background: #dcfce7; color: #16a34a; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 32px;">
            ✓
          </div>
          <h1 style="color: #0f172a; font-size: 24px; margin-bottom: 8px;">ยืนยันอีเมลสำเร็จเรียบร้อย!</h1>
          <p style="color: #64748b; font-size: 14px; margin-bottom: 24px; line-height: 1.5;">บัญชีสมาชิก NEXUS TECH PRO ของคุณพร้อมใช้งานแล้ว สามารถเข้าสู่ระบบเพื่อเลือกซื้อสินค้าได้ทันที</p>
          <a href="${loginUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 14px;">
            ไปที่หน้าเข้าสู่ระบบ
          </a>
        </div>
      </div>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send('<h1>เกิดข้อผิดพลาดในการยืนยันอีเมล</h1>');
  }
});

// 3. LOGIN: เข้าสู่ระบบ + ตรวจสอบสิทธิ์ + ออก Token (JWT)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'กรุณากรอกอีเมลและรหัสผ่าน' });
    }

    // ตรวจหาผู้ใช้
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    }

    const user = result.rows[0];

    // ตรวจสอบสถานะการยืนยันอีเมลตามโจทย์ข้อ 1!
    if (!user.is_verified) {
      return res.status(403).json({
        message: 'กรุณายืนยันที่อยู่อีเมลของคุณก่อนเข้าสู่ระบบ'
      });
    }

    // ตรวจสอบรหัสผ่าน
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    }

    // สร้าง JWT Token บรรจุข้อมูล id, email, role
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'เข้าสู่ระบบสำเร็จ',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' });
  }
});

// 4. ME: ดึงข้อมูลโปรไฟล์ผู้ใช้ปัจจุบันจาก Token
router.get('/me', verifyToken, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, email, name, role, is_verified, created_at FROM users WHERE id = $1',
      [req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'ไม่พบข้อมูลผู้ใช้' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
  }
});

module.exports = router;
