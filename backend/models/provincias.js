const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('provincias', {
    id_provincia: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    paises_id_pais: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'paises',
        key: 'id_pais'
      }
    },
    nombre: {
      type: DataTypes.STRING(64),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'provincias',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_provincia" },
        ]
      },
      {
        name: "fk_provincias_paises1_idx",
        using: "BTREE",
        fields: [
          { name: "paises_id_pais" },
        ]
      },
    ]
  });
};
