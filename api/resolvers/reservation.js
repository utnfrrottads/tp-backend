import { Op } from 'sequelize';
import moment from 'moment';

export default {
	Reservation: {
		table: ({ tableId }, args, { db }) =>
			db.table.findOne({ where: { id: tableId } }),
	},
	Query: {
		reservation: (parent, { id }, { db }) => db.reservation.findByPk(id),
		reservations: (parent, args, { db }) => db.reservation.findAll(),
		reservationsBySize: async (parent, { size }, { db }) => {
			const tablesLen = (
				await db.table.findAll({
					where: {
						size: {
							[Op.gte]: size,
						},
					},
				})
			).length;

			if (!tablesLen) return [];

			const reservations = await db.reservation.findAll({
				where: {
					cancelationDateTime: null,
					reservationDateTime: {
						[Op.gt]: moment().subtract(4, 'hours'),
					},
				},
			});

			const reservedDates = [];
			const diff = moment().add(1, 'M').diff(new Date(), 'days');

			for (let i = 1; i <= diff; i += 1) {
				const actualDate = moment().add(i, 'days').toDate();
				const actualReservedTables = reservations.filter(
					({ reservationDateTime }) =>
						moment(reservationDateTime).isSame(actualDate, 'date')
				);

				if (actualReservedTables.length === tablesLen) {
					reservedDates.push(actualDate);
				}
			}
			if (!reservedDates.length) return ['available'];
			return reservedDates;
		},
	},

	Mutation: {
		createReservation: async (parent, { reservation }, { db }) => {
			const table = await db.table.findOne({
				where: {
					size: {
						[Op.gte]: reservation.partySize,
					},
				},
				include: [
					{
						model: db.reservation,
						where: {
							cancelationDateTime: null,
							reservationDateTime: {
								[Op.ne]: reservation.reservationDateTime,
							},
						},
					},
				],
			});

			if (!table) {
				// ToDo: Throw Excepction table not found.
			}

			const newReservation = await db.reservation.create({
				...reservation,
				tableId: table.id,
			});
			return newReservation;
		},

		updateReservation: async (parent, { id, reservation }, { db }) => {
			const table = await db.table.findByPk(reservation.tableId);

			if (!table) {
				// ToDo: Throw Exception table not found.
			}

			await db.reservation.update(reservation, {
				where: { id },
			});
			const updated = await db.reservation.findByPk(reservation.tableId);
			return updated;
		},

		deleteReservation: (parent, { id }, { db }) =>
			db.reservation.destroy({
				where: { id },
			}),
	},
};
