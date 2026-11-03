// api/index.js - ตัวรัน Express Backend บน Vercel Serverless
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// นำเข้า Routes จากโฟลเดอร์ backend
const productsRouter = require('../backend/routes/products');
const authRouter = require('../backend/routes/auth');
const ordersRouter = require('../backend/routes/orders');

// กำหนดเส้นทาง API
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);

app.get('/api', (req, res) => {
  res.send('🚀 NEXUS IT API is running on Vercel Serverless Cloud!');
});

module.exports = app;
