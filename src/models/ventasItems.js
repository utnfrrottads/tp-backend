module.exports = (sequelize, dataType) => {
    const VentasItems = sequelize.define('VentasItems', {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cantidad: {
            type: dataType.INTEGER,
            allowNull: true
        },
        venta_id: {
            type: dataType.INTEGER,
            references: {
                model: 'Ventas',
                key: 'id'
            }
        },
        producto_id: {
            type: dataType.INTEGER,
            references: {
                model: 'Productos',
                key: 'id'
            }
        }
    });

    VentasItems.belongsTo(sequelize.models.Productos, { as: 'producto', foreignKey: 'producto_id' });

    return VentasItems;
};
