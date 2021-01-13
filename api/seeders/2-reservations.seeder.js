
const moment = require('moment');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('reservations', [
			{
				id: 1,
				CustomerName: 'Lucas',
				partySize: 2,
				reservationDateTime: moment().add(1, 'hours').toDate(),
				tableId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				CustomerName: 'Agustín',
				partySize: 2,
				reservationDateTime: moment().add(2, 'hours').toDate(),
				tableId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				CustomerName: 'Natalia',
				partySize: 2,
				reservationDateTime: moment().add(3, 'hours').toDate(),
				tableId: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 4,
				CustomerName: 'Francisco',
				partySize: 2,
				reservationDateTime: moment().add(1, 'days').toDate(),
				tableId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 5,
				CustomerName: 'Julia',
				partySize: 3,
				reservationDateTime: moment().add(2, 'hours').toDate(),
				tableId: 4,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 6,
				CustomerName: 'Cholo',
				partySize: 3,
				reservationDateTime: moment().add(5, 'hours').toDate(),
				tableId: 5,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 7,
				CustomerName: 'Tito',
				partySize: 4,
				reservationDateTime: moment().add(2, 'days').toDate(),
				tableId: 6,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 8,
				CustomerName: 'Hernán',
				partySize: 6,
				reservationDateTime: moment().add(2, 'hours').toDate(),
				tableId: 7,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('reservations', null);
	},
};
