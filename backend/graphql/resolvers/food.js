const Food = require('../../models/Food')

module.exports = {
  Query: {
    async getAllFood(){
      try{
        const food = await Food.find();
        console.log(food)
        return food;
      } catch(e) {
        throw new Error(e);
      }
    },
  }
}
