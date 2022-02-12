module.exports = (sequelize, dataType) => {
    return sequelize.define('Proveedores', {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cuit_dni: {
            type: dataType.STRING,
            allowNull: false
        },
        razon_social: {
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
        email: {
            type: dataType.STRING,
            allowNull: true
        },
        direccion: {
            type: dataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        activo: {
            type: dataType.BOOLEAN,
            allowNull: false
        }
    });
};
