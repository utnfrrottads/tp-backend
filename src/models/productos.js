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
        //ASOCIACION CON CATEGORIAS
        Productos.belongsTo(models.Categorias, { as: 'categoria' });

        // //ASOCIACION CON PROVEEDORES
        // Productos.belongsToMany(models.Proveedores, { through: models.ProveedorProductos });

        // //ASOCIACION CON ITEMS
        // Productos.hasOne(models.Items, {
        //     foreignKey: {
        //         allowNull: false
        //     }
        // });
    };

    return Productos;

};