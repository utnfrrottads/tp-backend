const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('direcciones', {
    id_direccion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ciudades_id_ciudad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ciudades',
        key: 'id_ciudad'
      }
    },
    codigo_postal: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    calle: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    departamento: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    piso: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'direcciones',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_direccion" },
        ]
      },
      {
        name: "fk_direcciones_ciudades1_idx",
        using: "BTREE",
        fields: [
          { name: "ciudades_id_ciudad" },
        ]
      },
    ]
  });
};
