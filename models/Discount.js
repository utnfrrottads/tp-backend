
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DiscountSchema = new Schema({
  description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
  products: [{
      type: Schema.Types.ObjectId,
      ref: 'Product',
  }],
  percentage: {
      type: Number,
      require: true,
    },
  status: {
      type: Boolean,
      required: true,
      default: true,
    },
  startDate: {
      type: Date,
      require: false,
    },
  endDate: {
      type: Date,
      require: false,
    },
  });

module.exports = mongoose.model('discounts', DiscountSchema)
