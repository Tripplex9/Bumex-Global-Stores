const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: [{ type: String }],
  phone: String,
  profilePicture: String,
  role: { type: String, enum: ['customer', 'admin', 'staff'], default: 'customer' },
  loyaltyPoints: { type: Number, default: 0 },
  referrals: [{ type: String }],
  cart: [{ productId: String, quantity: Number }],
  wishlist: [{ productId: String }],
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
