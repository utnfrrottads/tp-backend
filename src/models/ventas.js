module.exports = (sequelize, dataType) => {
    const Ventas = sequelize.define('Ventas', {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total: {
            type: dataType.REAL,
            defaultValue: 0
        },
        nomTarjeta: {
            type: dataType.STRING,
            allowNull: false
        },
        numTarjeta: {
            type: dataType.STRING,
            allowNull: false
        },
        cantCuotas: {
            type: dataType.INTEGER,
            allowNull: false
        },
        fecha: {
            type: dataType.DATE,
            allowNull: false
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
