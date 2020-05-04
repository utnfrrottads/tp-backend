export default {
  Query: {
    categories: (parent, args, { db }, info) => db.category.findAll(),
    category: (parent, { id }, { db }, info) => db.category.findByPk(id),
  },
  Mutation: {
    createCategory: (parent, { desc }, { db }, info) =>
      db.category.create({
        desc: desc,
      }),
    updateCategory: (parent, { desc, id }, { db }, info) =>
      db.category.update(
        {
          desc: desc,
        },
        {
          where: {
            id: id,
          },
        }
      ),
    deleteCategory: (parent, { id }, { db }, info) =>
      db.category.destroy({
        where: {
          id: id,
        },
      }),
  },
};
