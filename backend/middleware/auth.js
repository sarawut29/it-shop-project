// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

// ตรวจสอบว่าผู้ใช้ส่ง Token ที่ถูกต้องมาหรือไม่
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // รูปแบบ Header: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'ไม่มี Token หรือไม่ได้รับอนุญาตให้เข้าถึง' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // เก็บข้อมูล user (id, email, role) ไว้ใน req
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token ไม่ถูกต้องหรือหมดอายุ' });
  }
};

// ตรวจสอบว่าผู้ใช้มีบทบาทเป็น Admin หรือไม่
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'ปฏิเสธการเข้าถึง: สำหรับผู้ดูแลระบบ (Admin) เท่านั้น' });
  }
};

module.exports = { verifyToken, requireAdmin };