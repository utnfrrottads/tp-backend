import mongoose, { Schema } from 'mongoose';
import Article from './articleModel';

const cartModel = new Schema(
  {
    cartLines: [
      {
        amount: { type: Number, min: 1 },
        article: { type: Schema.Types.ObjectId, ref: Article },
      },
    ],
    date: { type: Date },
    name: { type: String },
  },
);

module.exports = mongoose.model('Cart', cartModel);
