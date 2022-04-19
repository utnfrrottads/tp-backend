const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resultados', {
    entrevistas_id_entrevista: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'entrevistas',
        key: 'id_entrevista'
      }
    },
    evaluaciones_id_evaluacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'evaluaciones',
        key: 'id_evaluacion'
      }
    },
    resultado_evaluacion: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    comentario: {
      type: DataTypes.STRING(1024),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'resultados',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "entrevistas_id_entrevista" },
          { name: "evaluaciones_id_evaluacion" },
        ]
      },
      {
        name: "fk_entrevistas_has_evaluaciones_evaluaciones1_idx",
        using: "BTREE",
        fields: [
          { name: "evaluaciones_id_evaluacion" },
        ]
      },
      {
        name: "fk_entrevistas_has_evaluaciones_entrevistas1_idx",
        using: "BTREE",
        fields: [
          { name: "entrevistas_id_entrevista" },
        ]
      },
    ]
  });
};
