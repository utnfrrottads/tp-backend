module.exports = (sequelize, DataType)=>{

    const Ventas = sequelize.define('Ventas',{
        id:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total:{
            type: DataType.REAL,
            defaultValue: 0
        },
        nomTarjeta:{
            type: DataType.STRING,
            allowNull: false
        },
        numTarjeta:{
            type: DataType.STRING,
            allowNull: false
        },
        cantCuotas:{
            type: DataType.INTEGER,
            allowNull: false
        },
        fechaVenta:{
            type: DataType.DATE,
            allowNull: false
        },
        activo: {
            type: DataType.BOOLEAN,
           allowNull: false
        }

    },
    {
        timestamps: false
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

        //Ventas.sync();


    };

    return Ventas;

};
