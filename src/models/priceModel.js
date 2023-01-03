import mongoose, { Schema } from 'mongoose';

const priceModel = new Schema(
  {
    sinceDate: {
      type: Date,
      required: true,
      index: true,
      unique: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
    },
  },
);

module.exports = mongoose.model('Price', priceModel);
