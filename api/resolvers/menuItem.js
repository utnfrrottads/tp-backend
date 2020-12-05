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
		recipes: (parent, args, { db }) =>
			db.recipe.findAll({ where: { itemId: parent.id } }),
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
