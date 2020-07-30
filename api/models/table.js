module.exports = (sequelize, DataTypes) => {
   const Table = sequelize.define('table', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      size:{
         type: DataTypes.INTEGER,
         allowNull: false
      }
   });

   Table.associate = (models) => {
      Table.belongsToMany(models.reservation, { through: 'reservations_tables' });
   };

   return Table;
};
  