import mongoose, { Schema } from 'mongoose';
import Article from './articleModel';

const purchaseModel = new Schema(
  {
    code: {
      type: String,
      index: true,
      unique: true,
    },
    purchaseLines: [
      {
        amount: { type: Number, min: 1 },
        article: { type: Schema.Types.ObjectId, ref: Article },
      },
    ],
    date: { type: Date },
  },
);

module.exports = mongoose.model('Purchase', purchaseModel);
