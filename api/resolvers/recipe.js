export default {
	Recipe: {
		ingredient: ({ ingredientId }, args, { db }) =>
			db.ingredient.findOne({ where: { id: ingredientId } }),
		item: ({ itemId }, args, { db }) =>
			db.item.findOne({ where: { id: itemId } }),
	},
	Query: {
		recipes: (parent, args, { db }) => db.recipe.findAll(),
		recipe: (parent, { id }, { db }) => db.recipe.findByPk(id),
	},
	Mutation: {
		createRecipe: (parent, { recipe }, { db }) => db.recipe.create(recipe),
		deleteRecipe: (_, { id }, { db }) =>
			db.recipe.destroy({ where: { id } }),
		updateRecipe: (_, { id, recipe }, { db }) =>
			db.recipe
				.update(recipe, { where: { id } })
				.then(() => db.recipe.findByPk(id)),
	},
};
