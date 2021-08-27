module.exports = (sequelize, DataType)=>{

    const Items = sequelize.define('Items',{
        idItem:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cantPedida:{
            type: DataType.INTEGER,
            allowNull: true
        }
    });

    Items.hasAsociation = ()=>{
        return true;
    }

    Items.associate = (models)=>{
        //ASOCIACION CON VENTAS
        Items.belongsTo(models.Ventas);

        //ASOCIACION CON PRODUCTOS
        Items.belongsTo(models.Productos);

        //Items.sync({alter: true}); //{ force: true }
    
    };


    return Items;
}; 
