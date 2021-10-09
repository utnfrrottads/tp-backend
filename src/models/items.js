module.exports = (sequelize, DataType)=>{

    const Items = sequelize.define('Items',{
        id:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cantPedida:{
            type: DataType.INTEGER,
            allowNull: true
        }
    },
    {
        timestamps: false
    });

    Items.hasAsociation = ()=>{
        return true;
    }

    Items.associate = (models)=>{
        //ASOCIACION CON VENTAS
        Items.belongsTo(models.Ventas);

        //ASOCIACION CON PRODUCTOS
        Items.belongsTo(models.Productos);

        //Items.sync({force: true}); //{ force: true }
    
    };


    return Items;
}; 
