const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuarios', {
    id_usuarios: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    roles_id_roles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id_roles'
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
    'contraseña_hash': {
      type: DataTypes.STRING(64),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'usuarios',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_usuarios" },
        ]
      },
      {
        name: "fk_usuarios_roles1_idx",
        using: "BTREE",
        fields: [
          { name: "roles_id_roles" },
        ]
      },
      {
        name: "fk_usuarios_personas1_idx",
        using: "BTREE",
        fields: [
          { name: "personas_id_evaluador" },
        ]
      },
    ]
  });
};
