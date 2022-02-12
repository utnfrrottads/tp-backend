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
        }
    });

    Compras.hasAsociation = () => {
        return true;
    }

    Compras.associate = (models) => {
        Compras.hasMany(models.ComprasItems, {
            foreignKey: {
                allowNull: false
            },
            as: 'comprasItems'
        });
        Compras.belongsTo(models.Proveedores, { as: 'proveedor' });
    };

    return Compras;
};
