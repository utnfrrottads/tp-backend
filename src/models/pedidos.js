module.exports = (sequelize, DataType) =>{


    const Pedidos = sequelize.define('Pedidos',{
        idPedido:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    })

    Pedidos.hasAsociation = ()=>{
        return true;
    }

    Pedidos.associate = (models)=>{
        //ASOCIACION CON CLIENTES
        Pedidos.belongsTo(models.Clientes);

         //ASOCIACION CON PRODUCTOS
         Pedidos.belongsToMany(models.Productos, { through: models.Solicitudes });
    }

    return Pedidos;

}