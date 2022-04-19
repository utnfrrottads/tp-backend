const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('permisos', {
    operaciones_id_operaciones: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'operaciones',
        key: 'id_operaciones'
      }
    },
    roles_id_roles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'roles',
        key: 'id_roles'
      }
    }
  }, {
    sequelize,
    tableName: 'permisos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "operaciones_id_operaciones" },
          { name: "roles_id_roles" },
        ]
      },
      {
        name: "fk_operaciones_has_roles_roles1_idx",
        using: "BTREE",
        fields: [
          { name: "roles_id_roles" },
        ]
      },
      {
        name: "fk_operaciones_has_roles_operaciones_idx",
        using: "BTREE",
        fields: [
          { name: "operaciones_id_operaciones" },
        ]
      },
    ]
  });
};
