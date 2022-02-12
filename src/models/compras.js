module.exports = (sequelize, dataType) => {
    const Compras = sequelize.define('Compras', {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: dataType.DATE,
            allowNull: false,
        },
        proveedor_id: {
            type: dataType.INTEGER,
            references: {
                model: 'Proveedores',
                key: 'id'
            }
        }
    });

    Compras.belongsTo(sequelize.models.Proveedores, { as: 'proveedor', foreignKey: 'proveedor_id' });
    Compras.hasMany(sequelize.models.ComprasItems, { as: 'comprasItems', foreignKey: 'compra_id' });

    return Compras;
};
