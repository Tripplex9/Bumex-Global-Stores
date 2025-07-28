const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Order = require('../models/Order');
const User = require('../models/User');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

router.post('/orders', async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
  const { paymentRef, cart, address } = req.body;
  const order = new Order({ userId: decoded.id, items: cart, paymentRef, address });
  await order.save();
  const user = await User.findById(decoded.id);
  user.loyaltyPoints += cart.reduce((sum, item) => sum + item.price, 0) / 100;
  await user.save();
  transporter.sendMail({
    to: user.email,
    subject: `Order Confirmation #${order._id}`,
    html: `<h1>Order #${order._id}</h1><p>Thank you for your purchase!</p>`,
  });
  res.json(order);
});

router.get('/orders', async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
  const orders = await Order.find({ userId: decoded.id });
  res.json(orders);
});

router.post('/cart', async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
  const user = await User.findById(decoded.id);
  user.cart = req.body.cart;
  await user.save();
  res.json({ message: 'Cart saved' });
});

router.post('/wishlist', async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
  const user = await User.findById(decoded.id);
  user.wishlist = req.body.wishlist;
  await user.save();
  res.json({ message: 'Wishlist saved' });
});

module.exports = router;
