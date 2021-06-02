const Sequelize = require('sequelize');


module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sector', {
    id_sector: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(128),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sector',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_sector" },
        ]
      },
    ]
  });
};
