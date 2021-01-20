export default {
	Order: {
		table: ({ tableId }, args, { db }) =>
			db.table.findOne({ where: { id: tableId } }),
		lines: (parent, args, { db }) =>
			db.line.findAll({ where: { orderId: parent.id } }),
		staff: ({ staffId }, args, { db }) =>
			db.staff.findOne({ where: { id: staffId } }),
		status: (parent) => {
			if (parent.paidAt) return 'PAID';
			if (parent.closedAt) return 'CLOSED';
			return 'OPEN';
		},
	},
	Query: {
		orders: (parent, args, { db }) => db.order.findAll(),
		order: (parent, { id }, { db }) => db.order.findByPk(id),
	},
	Mutation: {
		createOrder: (parent, { tableId }, { db }) =>
			db.order.create({ tableId }),
		deleteOrder: (parent, { id }, { db }) =>
			db.order.destroy({ where: { id } }),
	},
};
