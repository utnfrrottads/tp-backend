export default {
	Item: {
		categories: ({ id }, args, { db }) =>
			db.category.findAll({
				include: [
					{
						model: db.item,
						where: { id },
					},
				],
			}),
		ingredients: ({ id }, args, { db }) =>
			db.ingredient.findAll({
				include: [
					{
						model: db.item,
						where: { id },
					},
				],
			}),
	},
	Query: {
		items: (parent, args, { db }) => db.item.findAll(),
		item: (parent, { id }, { db }) => db.item.findByPk(id),
	},
	Mutation: {
		createItem: (parent, { item }, { db }) => db.item.create({ ...item }),
		updateItem: (parent, { id, item }, { db }) =>
			db.item.update({ ...item }, { where: { id } }),
		deleteItem: (parent, { id }, { db }) =>
			db.item.destroy({
				where: {
					id,
				},
			}),
	},
};
