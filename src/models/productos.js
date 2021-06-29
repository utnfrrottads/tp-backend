module.exports = (sequelize, DataType)=>{

    const Productos = sequelize.define('Productos',{
        idProd:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion:{
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        precio:{
            type: DataType.REAL,
            allowNull: false
        },
        stock:{
            type: DataType.INTEGER,
            allowNull: false
        },
        cantMinima:{
            type: DataType.INTEGER,
            allowNull: false
        }

    });

    Productos.hasAsociation = ()=>{
        return true;
    }

    Productos.associate = (models)=>{
        Productos.belongsTo(models.Categorias);

        Productos.belongsToMany(models.Proveedores, { through: 'proveedorProductos' });
    };

    return Productos;

};