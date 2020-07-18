export default {
  Query: {
    items: (parent, args, { db }, info) => db.item.findAll(),
    item: (parent, { id }, { db }, info) => db.item.findByPk(id),
  },
  Mutation: {
    createItem: (parent, { item }, { db }, info) => db.item.create({ ...item }),
    updateItem: (parent, { id, item }, { db }, info) =>
      db.item.update({ ...item }, { where: { id: id } }),
    deleteItem: (parent, { id }, { db }, info) =>
      db.item.destroy({
        where: {
          id: id,
        },
      }),
  },
};
