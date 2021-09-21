module.exports = (sequelize, DataType) =>{


    const Clientes = sequelize.define('Clientes',{
        dni:{
            type: DataType.STRING,
            primaryKey: true
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
            allowNull: true
        },
        direccion:{
            type:DataType.STRING,
            allowNull: true
        },
        tipoCliente:{
            type:DataType.STRING,
<<<<<<< HEAD
            allowNull: false
        },
        activo: {
            type: DataType.BOOLEAN,
           allowNull: false
=======
            allowNull: true
>>>>>>> 607dcfb7955ad130e9857e8e845b88af28fbb8b0
        }
    })

    Clientes.hasAsociation = ()=>{
        return true;
    }


    Clientes.associate = (models)=>{

        //ASOCIACION CON VENTAS
        Clientes.hasMany(models.Ventas,{
            foreignKey:{
                allowNull:false
            }
        });

       // Clientes.sync({alter: true});

    };

    return Clientes;

}
