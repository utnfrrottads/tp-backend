import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import Purchase from './purchaseModel';
import Cart from './cartModel';

const customerModel = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    name: { type: String },
    lastName: { type: String },
    password: { type: String },
    dni: { type: String },
    purchases: [{ type: Purchase.schema }],
    carts: [{ type: Cart.schema }],
  },
);

// Middleware
async function hashPassword(next) {
  if (this.password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
  }
  return next();
}
customerModel.pre('save', hashPassword);

module.exports = mongoose.model('Customer', customerModel);
