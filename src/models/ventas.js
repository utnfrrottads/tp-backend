module.exports = (sequelize, dataType) => {
    const Ventas = sequelize.define('Ventas', {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: dataType.DATE,
            allowNull: false
        },
        formaPago: {
            type: dataType.STRING,
            validate: {
                isIn: [['EFECTIVO', 'TRANSFERENCIA', 'TARJETA DE CREDITO', 'TARJETA DE DEBITO', 'OTRO']],
                isUppercase: true
            },
            allowNull: false
        },
        porcentajeDescuento: {
            type: dataType.REAL,
            defaultValue: 0
        },
        total: {
            type: dataType.REAL,
            defaultValue: 0
        }
    });

    Ventas.hasAsociation = () => {
        return true;
    }

    Ventas.associate = (models) => {
        Ventas.hasMany(models.VentasItems, {
            foreignKey: {
                allowNull: false
            },
            as: 'ventasItems'
        });
        Ventas.belongsTo(models.Clientes, { as: 'cliente' });
    };

    return Ventas;
};
