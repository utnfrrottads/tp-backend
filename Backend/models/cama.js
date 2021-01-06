module.exports = (sequelize, DataTypes) => {
    const Cama = sequelize.define("Cama", {
      //completar y averiguar como hacer foraneas aca
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull:false
      },
      estado:{
          type: DataTypes.BOOLEAN,
          allowNull: true
      }
    });
    return Cama;
  };