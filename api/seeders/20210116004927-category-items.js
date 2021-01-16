

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('categories_items', [
			{
				categoryId: 2,
				itemId: 5,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				categoryId: 7,
				itemId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				categoryId: 5,
				itemId: 10,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('categories_items', null, {});
	},
};
