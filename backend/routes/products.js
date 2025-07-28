const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/products', async (req, res) => {
  const { category, sort, featured } = req.query;
  let query = {};
  if (category) query.category = category;
  if (featured) query.featured = featured === 'true';
  let sortOption = {};
  if (sort === 'price-asc') sortOption.price = 1;
  if (sort === 'price-desc') sortOption.price = -1;
  if (sort === 'latest') sortOption.createdAt = -1;
  const products = await Product.find(query).sort(sortOption);
  res.json(products);
});

router.get('/products/search', async (req, res) => {
  const { q } = req.query;
  const products = await Product.find({ $text: { $search: q } });
  res.json(products);
});

router.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

router.post('/products', async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
  if (decoded.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

module.exports = router;
