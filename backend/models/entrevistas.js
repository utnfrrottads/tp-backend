const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('entrevistas', {
    id_entrevista: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(63),
      allowNull: false
    },
    fecha_hora: {
      type: DataTypes.DATE,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('pendiente','finalizada','cancelada','reprogramada'),
      allowNull: false
    },
    comentario: {
      type: DataTypes.STRING(1023),
      allowNull: true
    },
    personas_id_candidato: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'personas',
        key: 'id_persona'
      }
    },
    personas_id_evaluador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'personas',
        key: 'id_persona'
      }
    },
    vacantes_id_vacante: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vacantes',
        key: 'id_vacante'
      }
    }
  }, {
    sequelize,
    tableName: 'entrevistas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_entrevista" },
        ]
      },
      {
        name: "fk_entrevistas_personas1_idx",
        using: "BTREE",
        fields: [
          { name: "personas_id_candidato" },
        ]
      },
      {
        name: "fk_entrevistas_vacantes1_idx",
        using: "BTREE",
        fields: [
          { name: "vacantes_id_vacante" },
        ]
      },
      {
        name: "fk_entrevistas_personas_idx",
        using: "BTREE",
        fields: [
          { name: "personas_id_evaluador" },
        ]
      },
    ]
  });
};
