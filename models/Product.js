
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: {
    type: String,
    required:  true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  price: {
      type: Number,
      require: true,
    },
  status: {
      type: Boolean,
      required: true,
      default: true,
    },
  }
);



module.exports = mongoose.model('products', ProductSchema)
