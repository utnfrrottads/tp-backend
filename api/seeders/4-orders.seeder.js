
const moment = require('moment');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('orders', [
			{
				id: 1,
				tableId: 5,
				staffId: 1,
				paidAt: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				tableId: 6,
				staffId: 2,
				paidAt: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				tableId: 1,
				staffId: 1,
				paidAt: moment().subtract(1, 'days').toDate(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 4,
				tableId: 1,
				staffId: 1,
				paidAt: moment().subtract(2, 'days').toDate(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('orders', null);
	},
};
