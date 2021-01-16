

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('ingredients_items', [
			{
				ingredientId: 8,
				itemId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				ingredientId: 2,
				itemId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				ingredientId: 11,
				itemId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('ingredients_items', null, {});
	},
};
