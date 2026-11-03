// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// นำเข้า Routes
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const ordersRouter = require('./routes/orders'); // << เพิ่มบรรทัดนี้

// กำหนดเส้นทาง API
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter); // << เพิ่มบรรทัดนี้

app.get('/', (req, res) => {
  res.send('IT Shop API Server is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server รันอยู่ที่พอร์ต http://localhost:${PORT}`);
});