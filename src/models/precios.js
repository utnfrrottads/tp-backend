module.exports = (sequelize, dataType) => {
    const PreciosVenta = sequelize.define('PreciosVenta', {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: dataType.DATE,
            allowNull: false
        },
        precio: {
            type: dataType.REAL
        }
    });

    PreciosVenta.hasAsociation = () => {
        return true;
    }

    PreciosVenta.associate = (models) => {
        PreciosVenta.belongsTo(models.Productos, { as: 'producto' });
    }

    return PreciosVenta;
};
