module.exports = (sequelize, DataType)=>{

    const Solicitudes = sequelize.define('Solicitudes',{
        cantPedida:{
            type: DataType.INTEGER,
            allowNull: true
        },
        fechaSolicitud:{
            type: DataType.DATE  
        }
    });

    Solicitudes.hasAsociation = ()=>{
        return true;
    }

    Solicitudes.associate = (models)=>{
        //ASOCIACION CON CATEGORIAS
        /*Solicitudes.hasMany(models.Ventas,{
            foreignKey:{
                //name: 'idSolicitud',
                allowNull:false,
                type: DataType.INTEGER
            }

        });*/

        Solicitudes.belongsTo(models.Ventas);

        //ESTE SYNC SE USÓ PORQUE HICE UN CAMBIO EN EL MODELO CUANDO LA TABLA
        //YA ESTABA CREADA
        Solicitudes.sync({ force: true }) //alter
    
    };


    return Solicitudes;
}; 
