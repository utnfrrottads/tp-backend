export default {
	Query: {
		categories: (parent, args, { db }) => db.category.findAll(),
		category: (parent, { id }, { db }) => db.category.findByPk(id),
	},
	Mutation: {
		createCategory: (parent, { desc }, { db }) =>
			db.category.create({
				desc,
			}),
		updateCategory: (parent, { desc, id }, { db }) =>
			db.category.update(
				{
					desc,
				},
				{
					where: {
						id,
					},
				}
			),
		deleteCategory: (parent, { id }, { db }) =>
			db.category.destroy({
				where: {
					id,
				},
			}),
	},
};
