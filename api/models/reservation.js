module.exports = (sequelize, DataTypes) => {
   const Reservation = sequelize.define('reservation', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      tableNumber: {
         type: DataTypes.INTEGER,
      },
      customerName:{
         type: DataTypes.STRING,
      },
      phone: {
         type: DataTypes.STRING,
      },
      email: {
         type: DataTypes.STRING,
      },
      partySize: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      reservationDateTime: {
         type: DataTypes.DATE,
         defaultValue: sequelize.NOW
      },
      cancelationDateTime: {
         type: DataTypes.DATE,
      }
   });

   Reservation.associate = (models) => {
      Reservation.belongsToMany(models.table, { through: 'reservations_tables' });

      Reservation.hasOne(models.order);
   };  



   return Reservation;
};
   