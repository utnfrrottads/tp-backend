export default {
	OrderLine: {
		item: ({ itemId }, args, { db }) =>
			db.item.findOne({ where: { id: itemId } }),
		order: ({ orderId }, args, { db }) =>
			db.order.findOne({ where: { id: orderId } }),
		status: (parent) => {
			if (parent.canceledAt) return 'CANCELED';
			if (parent.deliveredAt) return 'DELIVERED';
			if (parent.finishedAt) return 'DONE';
			if (parent.startedAt) return 'PROCESSING';
			return 'PENDING';
		},
	},
	Query: {
		lines: (parent, args, { db }) => db.line.findAll(),
		line: (parent, { id }, { db }) => db.line.findByPk(id),
	},
	Mutation: {
		createLine: (parent, { line }, { db }) => db.line.create(line),
	},
};
