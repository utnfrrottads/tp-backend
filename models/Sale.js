

const mongoose = require('mongoose')
const Schema = mongoose.Schema

    const SaleSchema = new Schema(
        {
        code: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxlength: 40, 
          },
        subtotal: {
            type: Number,
            required: true,
          },
        total: {
            type: Number,
            require: true,
          },
        date: {
            type: Date,
            required: true,

          },
        }
      );

    module.exports = mongoose.model('sales', SaleSchema)
