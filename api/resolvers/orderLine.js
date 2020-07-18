export default {
  Query: {
    lines: (parent, args, { db }, info) =>
      db.line.findAll({
        include: [{ model: db.item, as: 'item' }],
      }),
    line: (parent, { id }, { db }, info) =>
      db.line.findByPk(id, {
        include: [{ model: db.item, as: 'item' }],
      }),
  },
  Mutation: {
    createLine: async (parent, line, { db }, info) => {
      return await db.line.create({ ...line });
    },
  },
};
