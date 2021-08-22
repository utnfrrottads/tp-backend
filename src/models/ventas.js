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
        }

    });

    Ventas.hasAsociation = ()=>{
        return true;
    }

    Ventas.associate = (models)=>{
        //ASOCIACION CON SOLICITUDES
        //Ventas.belongsTo(models.Solicitudes);

        Ventas.hasOne(models.Solicitudes);

        Ventas.sync() //{ force: true }
    

    };

    return Ventas;

};