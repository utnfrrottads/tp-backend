const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vacantes', {
    id_vacante: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cargo: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    estado: {
      type: DataTypes.ENUM("pendiente de evaluador","evaluador asignado","cerrada"),
      allowNull: false,
      defaultValue: "pendiente de evaluador"
    },
    id_empresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'empresas',
        key: 'id_empresa'
      }
    }
  }, {
    sequelize,
    tableName: 'vacantes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_vacante" },
        ]
      },
      {
        name: "fk_vacantes_empresas1_idx",
        using: "BTREE",
        fields: [
          { name: "id_empresa" },
        ]
      },
    ]
  });
};
