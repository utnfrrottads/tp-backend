export default {
	Query: {
		lines: (parent, args, { db }) =>
			db.line.findAll({
				include: [{ model: db.item, as: 'item' }],
			}),
		line: (parent, { id }, { db }) =>
			db.line.findByPk(id, {
				include: [{ model: db.item, as: 'item' }],
			}),
	},
	Mutation: {
		createLine: (parent, line, { db }) => db.line.create({ ...line }),
	},
};
