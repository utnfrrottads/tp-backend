module.exports = (sequelize, DataType)=>{

    const Proveedores = sequelize.define('Proveedores',{
        idProv:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        apellido:{
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        telefono:{
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        direccion:{
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        }

    });

    Proveedores.hasAsociation = ()=>{
        return true;
    }

    Proveedores.associate = (models)=>{
        
        //'proveedorProductos'
        Proveedores.belongsToMany(models.Productos, { through: models.ProveedorProductos }); 
    };

    return Proveedores;

};