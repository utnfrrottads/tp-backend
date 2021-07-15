module.exports = (sequelize, DataType)=>{

    const Solicitudes = sequelize.define('Solicitudes',{
        cantPedida:{
            type: DataType.INTEGER,
            allowNull: false
        }
    });

    Solicitudes.hasAsociation = ()=>{
        return true;
    }

    Solicitudes.associate = (models)=>{
        //ASOCIACION CON CATEGORIAS
        Solicitudes.hasMany(models.Ventas,{
            foreignKey:{
                allowNull:false
            }
        });

        //ESTE SYNC SE USÓ PORQUE HICE UN CAMBIO EN EL MODELO CUANDO LA TABLA
        //YA ESTABA CREADA
        //Solicitudes.sync({ alter: true }) 
    
    };


    return Solicitudes;
};
