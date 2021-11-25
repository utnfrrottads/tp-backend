module.exports = (sequelize, DataType) => {

    const Compras = sequelize.define('Compras', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: DataType.DATE,
            allowNull: false,
        }
    });

    Compras.hasAsociation = () => {
        return true;
    }

    Compras.associate = (models) => {
        Compras.hasMany(models.ComprasItems, {
            foreignKey: {
                allowNull: false,
                name: 'compraId'
            }
        });
        Compras.belongsTo(models.Proveedores, { as: 'proveedor' });
    }

    return Compras;
};
