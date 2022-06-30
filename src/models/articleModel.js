import mongoose, { Schema } from 'mongoose';
import Category from './categoryModel';
import Provider from './providerModel';
import Price from './priceModel';

const articleModel = new Schema(
  {
    code: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    description: { type: String, required: true },
    category: { type: Category.schema, _id: false },
    urlImage: { type: String, default: 'assets/images/no_image.png' },
    stock: { type: Number, default: 0 },
    amountToOrder: { type: Number },
    orderPoint: { type: Number },
    prices: [{ type: Price.schema }],
    providers: [{ type: Provider.schema, _id: false }],
  },
  {
    toObject: { getters: true, setters: true },
    toJSON: { getters: true, setters: true },
    runSettersOnQuery: true,
  },
);

// virtuals properties
articleModel.virtual('price')
  .get(function () { return this.prices[0]; }) // eslint-disable-line func-names
  .set(function (price) { this.prices.unshift(price); }); // eslint-disable-line func-names

// Middleware (also triggered by populate method)
function sortPrices(next) {
  const { _conditions } = this;
  mongoose.model('Article').updateMany(
    _conditions, // first parameter
    {
      $push: {
        prices: {
          $each: [], // don't add any price
          $sort: { sinceDate: -1 }, // sort by sinceDate, descending
        },
      },
    }, // second parameter
    () => next(), // third parameter
  );
}

articleModel.pre('findOne', sortPrices);
articleModel.pre('find', sortPrices);

// indexes
articleModel.path('category.description').index({ text: true }, { default_language: 'spanish' });

const model = mongoose.model('Article', articleModel);
model.createIndexes();

module.exports = model;
