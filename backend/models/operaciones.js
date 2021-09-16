const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('operaciones', {
    id_operaciones: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    modulos_id_modulos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'modulos',
        key: 'id_modulos'
      }
    }
  }, {
    sequelize,
    tableName: 'operaciones',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_operaciones" },
        ]
      },
      {
        name: "fk_operaciones_modulos1_idx",
        using: "BTREE",
        fields: [
          { name: "modulos_id_modulos" },
        ]
      },
    ]
  });
};
