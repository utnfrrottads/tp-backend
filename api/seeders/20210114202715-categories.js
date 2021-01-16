

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('categories', [
			{
				id: 1,
				desc: 'Carnes',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				desc: 'Pastas',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				desc: 'Pizzas',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 4,
				desc: 'Ensaladas',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 5,
				desc: 'Bebidas',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 6,
				desc: 'Postres',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 7,
				desc: 'Vegetariano',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 8,
				desc: 'Sin gluten',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('categories', null, {});
	},
};
