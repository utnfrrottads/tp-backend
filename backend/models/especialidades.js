const Sequelize = require('sequelize');


module.exports = function(sequelize, DataTypes) {
  return sequelize.define('especialidades', {
    id_especialidad: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sector_id_sector: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sector',
        key: 'id_sector'
      }
    }
  }, {
    sequelize,
    tableName: 'especialidades',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_especialidad" },
        ]
      },
      {
        name: "fk_especialidades_sector1_idx",
        using: "BTREE",
        fields: [
          { name: "sector_id_sector" },
        ]
      },
    ]
  });
};
