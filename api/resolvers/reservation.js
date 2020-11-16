export default {
	Reservation: {
		table: ({ tableId }, args, { db }) =>
			db.table.findOne({ where: { id: tableId } }),
	},
	Query: {
		reservation: (parent, { id }, { db }) => db.reservation.findByPk(id),
		reservations: (parent, args, { db }) => db.reservation.findAll(),
	},

	Mutation: {
		createReservation: async (parent, { reservation }, { db }) => {
			const table = await db.table.findByPk(reservation.tableId);

			if (!table) {
				// ToDo: Throw Excepction table not found.
			}

			const newReservation = await db.reservation.create(reservation);
			return newReservation;
		},

		updateReservation: async (parent, { id, reservation }, { db }) => {
			const table = await db.table.findByPk(reservation.tableId);

			if (!table) {
				// ToDo: Throw Excepction table not found.
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
