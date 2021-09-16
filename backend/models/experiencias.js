const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('experiencias', {
    id_experiencia: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    institucion: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    descripcion: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fecha_fin: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    competencias: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tipo_experiencia: {
      type: DataTypes.ENUM('academica','laboral'),
      allowNull: false
    },
    finalizada: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    personas_id_persona: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'personas',
        key: 'id_persona'
      }
    }
  }, {
    sequelize,
    tableName: 'experiencias',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_experiencia" },
        ]
      },
      {
        name: "fk_experiencias_personas1_idx",
        using: "BTREE",
        fields: [
          { name: "personas_id_persona" },
        ]
      },
    ]
  });
};
