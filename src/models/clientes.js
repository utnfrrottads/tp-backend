module.exports = (sequelize, DataType) =>{


    const Clientes = sequelize.define('Clientes',{
        dni:{
            type: DataType.INTEGER,
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
            allowNull: false
        }
    })

    Clientes.hasAsociation = ()=>{
        return true;
    }

    
    Clientes.associate = (models)=>{
        //ASOCIACION CON PEDIDOS
        Clientes.hasMany(models.Pedidos,{
            foreignKey:{
                allowNull:false
            }
        });

    };

    return Clientes;

}