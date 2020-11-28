module.exports = (sequelize, DataTypes) => {
    const Cama = sequelize.define("Cama", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      estado:{
          type: DataTypes.BINARY,
          allowNull: false
      }
    });
    return Cama;
  };