
const mongoose = require('mongoose')
const Schema = mongoose.Schema

    const DiscountSchema = new Schema(
        {
        code: {
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
        percentage: {
            type: Number,
            require: false,
          },
        amount: {
            type: Number,
            require: false,
          },
        status: {
            type: Boolean,
            required: true,

          },
        startDate: {
            type: Date,
            require: true,
          },
        endDate: {
            type: Date,
            require: false,

          },
        }
      );

    module.exports = mongoose.model('discounts', DiscountSchema)
