export default {
    Query: {
        table: async (parent, { id }, { db }) => {
            const table = await db.table.findByPk(id, {
                include: {
                    association: 'orders',
                    order: [["createdAt", 'DESC']],
                    where: { closedAt: null },
                    limit: 1
                },
            });

            if (!table) {
                // ToDo: Throw Exception table not found
            }

            return {
                id: table.dataValues.id,
                size: table.dataValues.size,
                openOrder: table.dataValues.orders ? table.dataValues.orders[0] : null
            };
        },

        tables: async (parent, args, { db }) => {
            const tables = await db.table.findAll({
                include: {
                    association: 'orders',
                    order: [["createdAt", 'DESC']],
                    where: { closedAt: null },
                    limit: 1
                },
            })

            const result = [];

            for (const table of tables) {
                result.push({
                    id: table.dataValues.id,
                    size: table.dataValues.size,
                    openOrder: table.dataValues.orders ? table.dataValues.orders[0] : null
                })
            }

            return result;
        }
    },

    Mutation: {
        createTable: (parent, { table }, { db }) => db.table.create(table),

        updateTable: (parent, { table }, { db }) => db.table.update(
            table, 
            { where: { id: table.id }, }
        ).then(() => db.table.findByPk(table.id)),

        deleteTable: (parent, { id }, { db }) => db.table.destroy({
        where: {
            id: id,
        }
        })
    }
};
  