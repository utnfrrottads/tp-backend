export default {
  Query: {
    tables: (parent, args, { db }, info) => db.table.findAll(),
    
    table: (parent, { id }, { db }, info) => db.table.findByPk(id)
  },

  Mutation: {
    createTable: (parent, { size }, { db }, info) => db.table.create({ size: size }),

    updateTable: (parent, { id, size }, { db }, info) => {
      return db.table.update(
        { size: size }, 
        { where: { id: id } }
      ).then(() => db.table.findByPk(id))
    },

    deleteTable: (parent, { id }, { db }, info) => db.table.destroy({
      where: {
        id: id,
      }
    })
  }
};
  