const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ productId: String, quantity: Number, price: Number }],
  paymentRef: String,
  status: { type: String, enum: ['Processing', 'Shipped', 'Delivered'], default: 'Processing' },
  trackingNumber: String,
  address: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
