import { Op } from 'sequelize';
import moment from 'moment';

export default {
	Table: {
		currentOrder: (parent, _, { db }) =>
			db.order.findOne({
				where: { tableId: parent.id, paidAt: null },
				order: [['createdAt', 'DESC']],
			}),
		nextReservation: (parent, _, { db }) =>
			db.reservation.findOne({
				where: {
					tableId: parent.id,
					cancelationDateTime: null,
					reservationDateTime: {
						[Op.lt]: moment().add(4, 'hours'),
						[Op.gt]: moment().subtract(1, 'hours'),
					},
				},
			}),
		reservations: (parent, _, { db }) =>
			db.reservation.findAll({
				where: {
					tableId: parent.id,
					cancelationDateTime: null,
					reservationDateTime: {
						[Op.gt]: moment().subtract(4, 'hours'),
					},
				},
			}),
	},
	Query: {
		table: (parent, { id }, { db }) => db.table.findByPk(id),
		tables: (parent, args, { db }) => db.table.findAll(),
	},

	Mutation: {
		createTable: (parent, { table }, { db }) => db.table.create(table),
		updateTable: (parent, { id, table }, { db }) =>
			db.table
				.update(table, { where: { id } })
				.then(() => db.table.findByPk(id)),
		deleteTable: (parent, { id }, { db }) =>
			db.table.destroy({
				where: {
					id,
				},
			}),
	},
};
