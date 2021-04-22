const Category = require('../../models/Category')

module.exports = {
  Query: {
    async getCategories() {
      try{
        const categories = await Category.find();
        console.log(categories);
        return categories;
      } catch(e) {
        throw new Error(e);
      }
    }
  }
}
