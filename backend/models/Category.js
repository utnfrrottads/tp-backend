const { model, Schema } = require('mongoose');

const categorySchema = new Schema({
  tag: String,
});

module.exports = model('Category', categorySchema)
