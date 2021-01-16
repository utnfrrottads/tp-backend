

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('ingredients', [
			{
				id: 1,
				description: 'Carne magra',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				description: 'Pollo',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				description: 'Salmón',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 4,
				description: 'Tomate',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 5,
				description: 'Champignion',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 6,
				description: 'Papa',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 7,
				description: 'Lechuga',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 8,
				description: 'Calabaza',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 9,
				description: 'Queso',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 10,
				description: 'Cebolla',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 11,
				description: 'Ajo',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('ingredients', null, {});
	},
};
