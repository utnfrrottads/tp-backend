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
        nom_tarjeta: {
            type: dataType.STRING,
            allowNull: false
        },
        num_tarjeta: {
            type: dataType.STRING,
            allowNull: false
        },
        cant_cuotas: {
            type: dataType.INTEGER,
            allowNull: false
        },
        fecha: {
            type: dataType.DATE,
            allowNull: false
        },
        cliente_dni: {
            type: dataType.INTEGER,
            references: {
                model: 'Clientes',
                key: 'dni'
            }
        }
    });

    Ventas.belongsTo(sequelize.models.Clientes, { as: 'cliente', foreignKey: 'cliente_dni' });
    Ventas.hasMany(sequelize.models.VentasItems, { as: 'ventasItems', foreignKey: 'venta_id' });

    return Ventas;
};
