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
            allowNull: false
        },
        tipoCliente:{
           type:DataType.STRING,
            validate: {
               isIn:[['MAYORISTA','MINORISTA']],
                isUppercase: true
            }
        },
        activo: {
            type: DataType.BOOLEAN,
            allowNull: false
        }
    },
    {
        timestamps: false
    });

    Clientes.hasAsociation = ()=>{
        return true;
    }

    Clientes.associate = (models)=>{

     //Clientes.sync({force:true});

        Clientes.hasMany(models.Ventas,{
            foreignKey:{
                allowNull:false
            }
        });
    };

    return Clientes;
}
