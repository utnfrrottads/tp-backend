export default {
    Query: {
        tables: (parent, args, { db }, info) => db.table.findAll(),
        
        table: (parent, { id }, { db }, info) => db.table.findByPk(id)
    },

    Mutation: {
        createTable: (parent, { table }, { db }, info) => db.table.create(table),

        updateTable: (parent, { table }, { db }, info) => db.table.update(
            table, 
            { where: { id: table.id }, }
        ).then(() => db.table.findByPk(table.id)),

        deleteTable: (parent, { id }, { db }, info) => db.table.destroy({
        where: {
            id: id,
        }
        })
    }
    };
  