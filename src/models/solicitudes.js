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
    
    };

    return Solicitudes;
};
