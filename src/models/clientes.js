module.exports = (sequelize, dataType) => {
    const Clientes = sequelize.define('Clientes', {
        dni: {
            type: dataType.INTEGER,
            primaryKey: true
        },
        nombre: {
            type: dataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        apellido: {
            type: dataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        telefono: {
            type: dataType.STRING,
            allowNull: true
        },
        direccion: {
            type: dataType.STRING,
            allowNull: false
        },
        tipoCliente: {
            type: dataType.STRING,
            validate: {
                isIn: [['MAYORISTA', 'MINORISTA']],
                isUppercase: true
            }
        },
        activo: {
            type: dataType.BOOLEAN,
            allowNull: false
        }
    });

    Clientes.hasAsociation = () => {
        return true;
    }

    Clientes.associate = (models) => {
        Clientes.hasMany(models.Ventas, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Clientes;
}
