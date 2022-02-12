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
        }
    });

    VentasItems.hasAsociation = () => {
        return true;
    }

    VentasItems.associate = (models) => {
        VentasItems.belongsTo(models.Ventas, { as: 'venta' });
        VentasItems.belongsTo(models.Productos, { as: 'producto' });
    };

    return VentasItems;
};
