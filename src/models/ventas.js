module.exports = (sequelize, DataType)=>{

    const Ventas = sequelize.define('Ventas',{
        idVenta:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total:{
            type: DataType.REAL,
            allowNull: false,
            validate:{
                notEmpty: true
            }
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
        }

    });

    Ventas.hasAsociation = ()=>{
        return true;
    }

    Ventas.associate = (models)=>{
        //ASOCIACION CON SOLICITUDES
        Ventas.belongsTo(models.Solicitudes);

        Ventas.sync({ force: true })
    
    };

    return Ventas;

};