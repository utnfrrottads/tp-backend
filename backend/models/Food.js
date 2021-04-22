const { model, Schema } = require('mongoose');

const foodSchema = new Schema({
  tag: String,
  calories: Number,
  fats: Number,
  proteins: Number,
  carbos: Number,
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'categories'
  }
});

module.exports = model('Food', foodSchema);
