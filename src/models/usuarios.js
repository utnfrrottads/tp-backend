module.exports = (sequelize, dataType) => {
    return sequelize.define('Usuarios', {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario: {
            type: dataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            unique: true
        },
        clave: {
            type: dataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        rol: {
            type: dataType.STRING,
            validate: {
                isIn: [['Administrador', 'Compras', 'Ventas', 'Supervisor']]
            }
        },
        activo: {
            type: dataType.BOOLEAN,
            allowNull: false
        }
    });
}

