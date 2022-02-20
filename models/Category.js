
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 40, 
    },
  description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
  status: {
      type: Boolean,
      required: true,
      default: true,
    },
  });

module.exports = mongoose.model('categories', CategorySchema)
