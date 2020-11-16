export default {
	OrderLine: {
		item: ({ itemId }, args, { db }) =>
			db.item.findOne({ where: { id: itemId } }),
		order: ({ orderId }, args, { db }) =>
			db.order.findOne({ where: { id: orderId } }),
	},
	Query: {
		lines: (parent, args, { db }) => db.line.findAll(),
		line: (parent, { id }, { db }) => db.line.findByPk(id),
	},
	Mutation: {
		createLine: (parent, { line }, { db }) => db.line.create(line),
	},
};
