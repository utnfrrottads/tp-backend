export default {
	Query: {
		table: (parent, { id }, { db }) => {
			db.table.findByPk(id, {
				include: {
					association: 'orders',
					order: [['createdAt', 'DESC']],
					where: { closedAt: null },
					limit: 1,
				},
			});
		},

		tables: (parent, args, { db }) => {
			db.table.findAll({
				include: {
					association: 'orders',
					order: [['createdAt', 'DESC']],
					where: { closedAt: null },
					limit: 1,
				},
			});
		},
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
