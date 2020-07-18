export default {
  Query: {
    orders: (parent, args, { db }, info) => {
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
    order: (parent, { id }, { db }, info) =>
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
    createOrder: (parent, args, { db }, info) => db.order.create({}),
    deleteOrder: (parent, { id }, { db }, info) =>
      db.order.destroy({
        where: {
          id: id,
        },
      }),
  },
};
