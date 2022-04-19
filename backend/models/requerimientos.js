const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('requerimientos', {
    id_requerimiento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_vacante: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vacantes',
        key: 'id_vacante'
      }
    },
    descripcion: {
      type: DataTypes.STRING(1024),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'requerimientos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_requerimiento" },
        ]
      },
      {
        name: "fk_requerimientos_vacantes1_idx",
        using: "BTREE",
        fields: [
          { name: "id_vacante" },
        ]
      },
    ]
  });
};
