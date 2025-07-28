const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const PDFDocument = require('pdfkit');

router.get('/orders', async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const orders = await Order.find();
  res.json(orders);
});

router.post('/orders/:id/status', async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const order = await Order.findById(req.params.id);
  order.status = req.body.status;
  order.trackingNumber = req.body.trackingNumber;
  await order.save();
  const user = await User.findById(order.userId);
  transporter.sendMail({
    to: user.email,
    subject: `Order Update #${order._id}`,
    html: `<h1>Order #${order._id}</h1><p>Status: ${order.status}</p>`,
  });
  res.json(order);
});

router.get('/invoice/:id', async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const order = await Order.findById(req.params.id);
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=invoice-${order._id}.pdf`);
  doc.pipe(res);
  doc.text(`Invoice for Order #${order._id}`);
  order.items.forEach((item) => doc.text(`${item.productId}: ₦${item.price}`));
  doc.end();
});

module.exports = router;
