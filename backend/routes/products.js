// backend/routes/products.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, requireAdmin } = require('../middleware/auth');

// 1. QUERY: ดึงรายการสินค้าทั้งหมด (ทุกคนดูได้)
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let queryText = 'SELECT * FROM products';
    const params = [];

    // ฟังก์ชันเสริม: รองรับการค้นหาและกรองหมวดหมู่
    if (category && search) {
      queryText += ' WHERE category = $1 AND name ILIKE $2';
      params.push(category, `%${search}%`);
    } else if (category) {
      queryText += ' WHERE category = $1';
      params.push(category);
    } else if (search) {
      queryText += ' WHERE name ILIKE $1';
      params.push(`%${search}%`);
    }

    queryText += ' ORDER BY id DESC';

    const result = await db.query(queryText, params);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า' });
  }
});

// 2. QUERY BY ID: ดึงข้อมูลสินค้าเฉพาะชิ้น
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'ไม่พบสินค้าชิ้นนี้' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า' });
  }
});

// 3. INSERT: เพิ่มสินค้าใหม่ (เฉพาะ Admin เท่านั้น)
router.post('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { name, description, category, price, stock, image_url } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: 'กรุณากรอกชื่อสินค้า, ราคา และหมวดหมู่ให้ครบถ้วน' });
    }

    const queryText = `
      INSERT INTO products (name, description, category, price, stock, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [name, description, category, price, stock || 0, image_url || ''];
    const result = await db.query(queryText, values);

    res.status(201).json({ message: 'เพิ่มสินค้าสำเร็จ', product: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มสินค้า' });
  }
});

// 4. UPDATE: แก้ไขสินค้า (เฉพาะ Admin เท่านั้น)
router.put('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, price, stock, image_url } = req.body;

    const queryText = `
      UPDATE products 
      SET name = $1, description = $2, category = $3, price = $4, stock = $5, image_url = $6
      WHERE id = $7
      RETURNING *
    `;
    const values = [name, description, category, price, stock, image_url, id];
    const result = await db.query(queryText, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'ไม่พบสินค้าที่ต้องการแก้ไข' });
    }

    res.json({ message: 'แก้ไขสินค้าสำเร็จ', product: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการแก้ไขสินค้า' });
  }
});

// 5. DELETE: ลบสินค้า (เฉพาะ Admin เท่านั้น)
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'ไม่พบสินค้าที่ต้องการลบ' });
    }

    res.json({ message: 'ลบสินค้าสำเร็จ', deletedProduct: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบสินค้า' });
  }
});

module.exports = router;