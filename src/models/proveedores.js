module.exports = (sequelize, DataType)=>{

    const Proveedores = sequelize.define('Proveedores',{
        idProv:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        razonSocial:{
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

        //Proveedores.sync({alter: true}); //{ force: true }

    };

   

    return Proveedores;

};