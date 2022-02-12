module.exports = (sequelize, dataType) => {
    const Precios = sequelize.define('Precios', {
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
        },
        proveedor_id: {
            type: dataType.INTEGER,
            references: {
                model: 'Proveedores',
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

    Precios.belongsTo(sequelize.models.Proveedores, { as: 'proveedor', foreignKey: 'proveedor_id' });
    Precios.belongsTo(sequelize.models.Productos, { as: 'producto', foreignKey: 'producto_id' });

    return Precios;
};
