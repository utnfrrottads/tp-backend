

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('tables', [
			{ id: 1, size: 2 },
			{ id: 2, size: 2 },
			{ id: 3, size: 2 },
			{ id: 4, size: 4 },
			{ id: 5, size: 4 },
			{ id: 6, size: 4 },
			{ id: 7, size: 6 },
			{ id: 8, size: 6 },
		]);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('tables', null);
	},
};
