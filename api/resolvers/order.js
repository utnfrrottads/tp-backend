export default {
	Query: {
		orders: (parent, args, { db }) => {
			return db.order.findAll({
				include: [
					{
						model: db.line,
						as: 'lines',
						include: [{ model: db.item, as: 'item' }],
					},
				],
			});
		},
		order: (parent, { id }, { db }) =>
			db.order.findByPk(id, {
				include: [
					{
						model: db.line,
						as: 'lines',
						include: [{ model: db.item, as: 'item' }],
					},
				],
			}),
	},
	Mutation: {
		createOrder: (parent, args, { db }) => db.order.create({}),
		deleteOrder: (parent, { id }, { db }) =>
			db.order.destroy({
				where: {
					id,
				},
			}),
	},
};
