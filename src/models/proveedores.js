module.exports = (sequelize, dataType) => {
    const Proveedores = sequelize.define('Proveedores', {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cuitDni: {
            type: dataType.STRING,
            allowNull: false
        },
        razonSocial: {
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
    },
        {
            timestamps: false
        });

    Proveedores.hasAsociation = () => {
        return false;
    }

    return Proveedores;
};
