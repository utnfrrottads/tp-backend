module.exports = (sequelize, dataType) => {
    return sequelize.define('Clientes', {
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
        tipo_cliente: {
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
}
