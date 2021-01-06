module.exports = (sequelize, DataTypes) => {
    const Cama = sequelize.define("Cama", {
      id: {
        primaryKey:true,
        type: DataTypes.INTEGER,
        allowNull: false
      },
      estado:{
          type: DataTypes.BOOLEAN,
          allowNull: false
      }
    });
    return Cama;
  };