// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, requireAdmin } = require('../middleware/auth');

// 1. CREATE ORDER: สั่งซื้อสินค้า (สำหรับ Member ที่ล็อกอินแล้ว)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { items } = req.body; // [{ product_id: 1, quantity: 2 }]
    const userId = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'ไม่มีรายการสินค้าในคำสั่งซื้อ' });
    }

    let totalAmount = 0;
    const orderItemsData = [];

    // ตรวจสอบสต็อกและคำนวณราคาทั้งหมด
    for (const item of items) {
      const productRes = await db.query('SELECT * FROM products WHERE id = $1', [item.product_id]);
      if (productRes.rows.length === 0) {
        return res.status(404).json({ message: `ไม่พบสินค้า ID ${item.product_id}` });
      }

      const product = productRes.rows[0];
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `สินค้า "${product.name}" มีจำนวนไม่พอ (เหลือเพียง ${product.stock} ชิ้น)`
        });
      }

      const itemTotal = parseFloat(product.price) * item.quantity;
      totalAmount += itemTotal;

      orderItemsData.push({
        product_id: product.id,
        quantity: item.quantity,
        price: product.price,
        currentStock: product.stock
      });
    }

    // บันทึกคำสั่งซื้อลงตาราง orders (สถานะเริ่มต้น: paid)
    const orderRes = await db.query(
      `INSERT INTO orders (user_id, total_amount, status)
       VALUES ($1, $2, 'paid') RETURNING *`,
      [userId, totalAmount]
    );
    const newOrder = orderRes.rows[0];

    // บันทึกรายการย่อยลงตาราง order_items พร้อมตัดสต็อกสินค้าในตาราง products
    for (const item of orderItemsData) {
      await db.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [newOrder.id, item.product_id, item.quantity, item.price]
      );

      // ตัดสต็อกสินค้าจริง
      await db.query(
        `UPDATE products SET stock = stock - $1 WHERE id = $2`,
        [item.quantity, item.product_id]
      );
    }

    res.status(201).json({
      message: 'สั่งซื้อสินค้าสำเร็จ!',
      order: newOrder
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสั่งซื้อสินค้า' });
  }
});

// 2. GET ORDERS: ดูประวัติคำสั่งซื้อพร้อมรายการสินค้าในออเดอร์
// ถ้าเป็น Admin จะดูได้ทั้งหมด / ถ้าเป็น Member จะดูได้เฉพาะของตัวเอง
router.get('/', verifyToken, async (req, res) => {
  try {
    let queryText = `
      SELECT o.id, o.total_amount, o.status, o.created_at, u.name as customer_name, u.email as customer_email
      FROM orders o
      JOIN users u ON o.user_id = u.id
    `;
    const params = [];

    // ถ้าไม่ใช่ Admin ให้ดูเฉพาะของตัวเอง
    if (req.user.role !== 'admin') {
      queryText += ' WHERE o.user_id = $1';
      params.push(req.user.id);
    }

    queryText += ' ORDER BY o.id DESC';

    const result = await db.query(queryText, params);
    const orders = result.rows;

    // ดึงรายการสินค้าย่อยในแต่ละ Order
    for (let order of orders) {
      const itemsRes = await db.query(
        `SELECT oi.id, oi.quantity, oi.price, p.name as product_name, p.image_url, p.category
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = $1`,
        [order.id]
      );
      order.items = itemsRes.rows;
    }

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลคำสั่งซื้อ' });
  }
});

// 3. UPDATE ORDER STATUS: อัปเดตสถานะคำสั่งซื้อ (เฉพาะ Admin เช่น จัดส่งแล้ว)
router.put('/:id/status', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await db.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'ไม่พบคำสั่งซื้อ' });
    }

    res.json({ message: 'อัปเดตสถานะคำสั่งซื้อสำเร็จ', order: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการอัปเดตสถานะคำสั่งซื้อ' });
  }
});

module.exports = router;
