export default {
	Order: {
		table: ({ tableId }, args, { db }) =>
			db.table.findOne({ where: { id: tableId } }),
		lines: (parent, args, { db }) =>
			db.line.findAll({ where: { orderId: parent.id } }),
	},
	Query: {
		orders: (parent, args, { db }) => db.order.findAll(),
		order: (parent, { id }, { db }) => db.order.findByPk(id),
	},
	Mutation: {
		createOrder: (parent, args, { db }) => db.order.create({}),
		deleteOrder: (parent, { id }, { db }) =>
			db.order.destroy({ where: { id } }),
	},
};
