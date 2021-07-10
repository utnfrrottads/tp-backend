const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contactos', {
    id_contacto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipoContacto: {
      type: DataTypes.ENUM('email','telefono','web'),
      allowNull: true
    },
    valor: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    personas_id_persona: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'personas',
        key: 'id_persona'
      }
    },
    empresas_id_empresa: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'empresas',
        key: 'id_empresa'
      }
    },
    experiencias_id_experiencia: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'experiencias',
        key: 'id_experiencia'
      }
    },
    descripcion: {
      type: DataTypes.STRING(256),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'contactos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_contacto" },
        ]
      },
      {
        name: "fk_contactos_personas1_idx",
        using: "BTREE",
        fields: [
          { name: "personas_id_persona" },
        ]
      },
      {
        name: "fk_contactos_empresas1_idx",
        using: "BTREE",
        fields: [
          { name: "empresas_id_empresa" },
        ]
      },
      {
        name: "fk_contactos_experiencias1_idx",
        using: "BTREE",
        fields: [
          { name: "experiencias_id_experiencia" },
        ]
      },
    ]
  });
};
