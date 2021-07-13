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
        //ASOCIACION CON CATEGORIAS
        Productos.belongsTo(models.Categorias);
    
        //ASOCIACION CON PROVEEDORES
        Productos.belongsToMany(models.Proveedores, { through: models.ProveedorProductos });

        //ASOCIACION CON PEDIDOS
        Productos.belongsToMany(models.Pedidos, { through: models.Solicitudes });
    };

    return Productos;

};