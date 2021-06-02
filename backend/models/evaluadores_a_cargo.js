const Sequelize = require('sequelize');


module.exports = function(sequelize, DataTypes) {
  return sequelize.define('evaluadores_a_cargo', {
    personas_id_evaluador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'personas',
        key: 'id_persona'
      }
    },
    especialidades_id_especialidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'especialidades',
        key: 'id_especialidad'
      }
    }
  }, {
    sequelize,
    tableName: 'evaluadores_a_cargo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "personas_id_evaluador" },
          { name: "especialidades_id_especialidad" },
        ]
      },
      {
        name: "fk_personas_has_especialidades_especialidades1_idx",
        using: "BTREE",
        fields: [
          { name: "especialidades_id_especialidad" },
        ]
      },
      {
        name: "fk_personas_has_especialidades_personas1_idx",
        using: "BTREE",
        fields: [
          { name: "personas_id_evaluador" },
        ]
      },
    ]
  });
};
