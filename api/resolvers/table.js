export default {
	Table: {
		orders: (parent, { limit }, { db }) =>
			db.order.findAll({
				where: { tableId: parent.id, closedAt: null },
				order: [['createdAt', 'DESC']],
				limit,
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
