module.exports = (sequelize, DataType)=>{

    const Ventas = sequelize.define('Ventas',{
        idVenta:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total:{
            type: DataType.REAL,
            defaultValue: 0
        },
        nomTarjeta:{
            type: DataType.STRING
        },
        numTarjeta:{
            type: DataType.STRING //,allowNull: false            
        },
        cantCuotas:{ 
            type: DataType.INTEGER
        },
        fechaVenta:{
            type: DataType.DATE  
        }

    });

    Ventas.hasAsociation = ()=>{
        return true;
    }

    Ventas.associate = (models)=>{
        //ASOCIACION CON ITEMS
        Ventas.hasMany(models.Items,{
            foreignKey:{
                allowNull:false
            }
        });

        // Se utiliza belongsTO para que tenga la foranea del cliente
        Ventas.belongsTo(models.Clientes);

        //Ventas.sync({alter: true}); //{ force: true }
    

    };

    return Ventas;

};