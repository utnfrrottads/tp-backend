

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('lines', [
			{
				id: 1,
				orderId: 1,
				itemId: 1,
				quantity: 2,
				customerComments: 'Sin ajo',
				updatedAt: new Date(),
			},
			{
				id: 2,
				orderId: 1,
				itemId: 10,
				quantity: 3,
				updatedAt: new Date(),
			},
		]);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('lines', null, {});
	},
};
