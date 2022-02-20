

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SaleSchema = new Schema(
    {  
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
        // default: 
      },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
}],
    }
  );

    module.exports = mongoose.model('sales', SaleSchema)
