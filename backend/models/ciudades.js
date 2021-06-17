const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ciudades', {
    id_ciudad: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    provincias_id_provincia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'provincias',
        key: 'id_provincia'
      }
    },
    nombre: {
      type: DataTypes.STRING(64),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ciudades',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_ciudad" },
        ]
      },
      {
        name: "fk_ciudades_provincias1_idx",
        using: "BTREE",
        fields: [
          { name: "provincias_id_provincia" },
        ]
      },
    ]
  });
};
