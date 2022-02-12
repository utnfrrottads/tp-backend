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
        },
        producto_id: {
            type: dataType.INTEGER,
            references: {
                model: 'Productos',
                key: 'id'
            }
        },
        compra_id: {
            type: dataType.INTEGER,
            references: {
                model: 'Compras',
                key: 'id'
            }
        }
    });
    
    ComprasItems.belongsTo(sequelize.models.Productos, { as: 'producto', foreignKey: 'producto_id' });

    return ComprasItems;
};
