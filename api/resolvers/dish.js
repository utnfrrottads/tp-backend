export default {
  Query: {
    dishes: (parent, args, { db }, info) => db.dish.findAll(),
    dish: (parent, { id }, { db }, info) => db.dish.findByPk(id),
  },
  Mutation: {
    createDish: (parent, { title }, { db }, info) =>
      db.dish.create({
        title: title,
      }),
    updateDish: (parent, { title, id }, { db }, info) =>
      db.dish.update(
        {
          title: title,
        },
        {
          where: {
            id: id,
          },
        }
      ),
    deleteDish: (parent, { id }, { db }, info) =>
      db.dish.destroy({
        where: {
          id: id,
        },
      }),
  },
};
