const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('personas', {
    id_persona: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    apellido: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    sexo: {
      type: DataTypes.ENUM('masculino','femenino','otro'),
      allowNull: true
    },
    documento: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    tipo_persona: {
      type: DataTypes.ENUM('candidato','evaluador'),
      allowNull: false
    },
    // activo: {                      // Poner en el caso que hagamos una baja lógica
    //   type: DataTypes.INTEGER,
    //   defaultaaValue: 1,
    //   allowNull: false
    // },
    direcciones_id_direccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'direcciones',
        key: 'id_direccion'
      }
    }
  }, {
    sequelize,
    tableName: 'personas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_persona" },
        ]
      },
      {
        name: "fk_personas_direcciones1_idx",
        using: "BTREE",
        fields: [
          { name: "direcciones_id_direccion" },
        ]
      },
    ]
  });
};
