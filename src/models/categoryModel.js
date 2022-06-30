import mongoose, { Schema } from 'mongoose';

const categoryModel = new Schema(
  {
    name: { type: String, required: true, index: true },
    description: { type: String, required: true },
  },
);

const model = mongoose.model('Category', categoryModel);
model.createIndexes();

module.exports = model;
