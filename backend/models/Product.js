const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  discount: Number,
  stock: { type: Number, required: true },
  category: String,
  subcategory: String,
  variations: [{ color: String, size: String, stock: Number }],
  images: [String],
  reviews: [{ userId: String, rating: Number, comment: String, date: Date }],
  featured: { type: Boolean, default: false },
});

productSchema.index({ name: 'text', description: 'text' });
module.exports = mongoose.model('Product', productSchema);
