module.exports = (sequelize, DataType) => {

    const Productos = sequelize.define('Productos', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        stock: {
            type: DataType.INTEGER,
            allowNull: false
        },
        cantidadMinima: {
            type: DataType.INTEGER,
            allowNull: false
        },
        activo: {
            type: DataType.BOOLEAN,
           allowNull: false
        }
    });

    Productos.hasAsociation = () => {
        return true;
    }

    Productos.associate = (models) => {
        //ASOCIACION CON CATEGORIAS
        Productos.belongsTo(models.Categorias);

        //ASOCIACION CON PROVEEDORES
        Productos.belongsToMany(models.Proveedores, { through: models.ProveedorProductos});

        //ASOCIACION CON ITEMS

        Productos.hasOne(models.Items, {
            foreignKey: {
                allowNull: false

            }
        });

        //Productos.sync({force: true}); //alter { force: true }
    };

    return Productos;

};