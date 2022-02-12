module.exports = (sequelize, dataType) => {
    const Productos = sequelize.define('Productos', {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: dataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        stock: {
            type: dataType.INTEGER,
            allowNull: false
        },
        cantidadMinima: {
            type: dataType.INTEGER,
            allowNull: false
        },
        precioVenta: {
            type: dataType.DECIMAL,
            allowNull: false
        },
        activo: {
            type: dataType.BOOLEAN,
            allowNull: false
        }
    });

    Productos.hasAsociation = () => {
        return true;
    }

    Productos.associate = (models) => {
        Productos.belongsTo(models.Categorias, { as: 'categoria' });
    };

    return Productos;
};
