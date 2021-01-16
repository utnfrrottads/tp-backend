

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('staffs', [
			{
				id: '1',
				firstName: 'Joaquín',
				lastName: 'Sabina',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: '2',
				firstName: 'Julia',
				lastName: 'Blanco',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: '3',
				firstName: 'Sol',
				lastName: 'Perez',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('staffs', null);
	},
};
