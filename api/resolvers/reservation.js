export default {
	Query: {
		reservation: (parent, { id }, { db }) => db.reservation.findByPk(
			id,
			{ include: ['table'] }
		),

		reservations: (parent, args, { db }) => db.reservation.findAll({include: ['table']})
	},


	Mutation: {
		createReservation: async (parent, { reservation }, { db }) => {
			const table = await db.table.findByPk(reservation.table.id);

			if (!table) {
				// ToDo: Throw Excepction table not found.
			}

			const newReservation = await db.reservation.create(reservation)
				.then(reservation => reservation.setTable(table));

			return {
				...newReservation.dataValues,
				table: {
					...table.dataValues
				}
			};

		},

		updateReservation: async (parent, { reservation }, { db }) => {
			const table = await db.table.findByPk(reservation.table.id);

			if (!table) {
				// ToDo: Throw Excepction table not found.
			}

			// AffectedRows sólo funciona en Postgres
			const [affectedRowsCount] = await db.reservation.update(reservation, {
				where: {
					id: reservation.id
				}
			});

			if (affectedRowsCount === 0) {
				return null;
			}

			return db.reservation.findByPk(reservation.id, { include: "table" });
		},

		deleteReservation: (parent, { id }, { db }) => db.reservation.destroy({
			where: {
				id: id,
			}
		}),
	}
};
    