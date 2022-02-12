module.exports = (sequelize, dataType) => {
    const ComprasItems = sequelize.define('ComprasItems', {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        precio: {
            type: dataType.REAL,
            allowNull: false
        },
        cantidad: {
            type: dataType.INTEGER,
            allowNull: false
        }
    });

    ComprasItems.hasAsociation = () => {
        return true;
    }

    ComprasItems.associate = (models) => {
        ComprasItems.belongsTo(models.Compras, { as: 'compra' });
        ComprasItems.belongsTo(models.Productos, { as: 'producto' });
    };

    return ComprasItems;
};
