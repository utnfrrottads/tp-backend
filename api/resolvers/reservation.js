const { Op } = require("sequelize");

export default {
  Query: {
    reservation: (parent, { id }, { db }, info) => db.reservation.findByPk(
        id, 
        { include: 'tables' }
    ),
    
    reservations: (parent, args, { db }, info) => db.reservation.findAll({include: 'tables'})
  },


  Mutation: {
    createReservation: (parent, { reservation }, { db }, info) => {
        return db.reservation.create(reservation)
            .then(async createdReservation => {
                const tableIds = [];

                for (const table of reservation.tables) {
                    tableIds.push(table.id);
                }

                const tableInstances = await db.table.findAll({
                    where: {
                        id: {
                            [Op.or]: [...tableIds]
                        }
                    }
                })

                if(tableInstances.length !== reservation.tables.length) {
                    // TODO: throw error, retornar cuál tabla no encontró
                }
                
                createdReservation.setTables(tableInstances);

                return {
                    ...createdReservation.dataValues,
                    tables: tableInstances
                }
            })
    },

    updateReservation: (parent, { reservation }, { db }, info) => { 
        return db.reservation.update(
            reservation, 
            { where: { id: reservation.id } }
        ).then(() => db.reservation.findByPk(reservation.id, { include: "tables" }))
    },

    deleteReservation: (parent, { id }, { db }, info) => db.reservation.destroy({
        where: { 
            id: id,
        }
    }),
  }
};
    