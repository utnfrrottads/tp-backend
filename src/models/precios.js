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
        }
    });

    Precios.hasAsociation = () => {
        return true;
    }

    Precios.associate = (models) => {
        Precios.belongsTo(models.Productos, { as: 'producto' });
        Precios.belongsTo(models.Proveedores, { as: 'proveedor' });
    }

    return Precios;
};
