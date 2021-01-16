

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('items', [
			{
				id: 1,
				title: 'Sopa de calabaza',
				desc: 'Sopa de calabaza',
				pricePerUnit: 200,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				title: 'Sopa de pollo',
				desc: 'Sopa de pollo',
				pricePerUnit: 190,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				title: 'Ensalada Caesar',
				pricePerUnit: 170,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 4,
				title: 'Sushi',
				pricePerUnit: 300,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 5,
				title: 'Gnochi',
				pricePerUnit: 230,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 6,
				title: 'Papas fritas',
				pricePerUnit: 130,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 7,
				title: 'Pollo al grill',
				desc: 'Con guarnicion',
				pricePerUnit: 200,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 8,
				title: 'Asado',
				pricePerUnit: 350,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 9,
				title: 'Carne a la portuguesa',
				pricePerUnit: 300,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 10,
				title: 'Agua Mineral',
				pricePerUnit: 80,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('items', null, {});
	},
};
