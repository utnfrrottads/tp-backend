export default {
	Ingredient: {
		items: ({ id }, args, { db }) =>
			db.item.findAll({
				include: [
					{
						model: db.ingredient,
						where: { id },
					},
				],
			}),
	},
	Query: {
		ingredients: (_, args, { db }) => db.ingredient.findAll(),
		ingredient: (_, { id }, { db }) => db.ingredient.findByPk(id),
	},
	Mutation: {
		createIngredient: (_, { ingredient }, { db }) =>
			db.ingredient.create(ingredient),
		deleteIngredient: (_, { id }, { db }) =>
			db.ingredient.destroy({ where: { id } }),
		updateIngredient: (_, { id, ingredient }, { db }) =>
			db.ingredient
				.update(ingredient, { where: { id } })
				.then(() => db.ingredient.findByPk(id)),
	},
};
