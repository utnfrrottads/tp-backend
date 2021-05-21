module.exports = (sequelize,DataType) => {
    
 const clients = sequelize.define('clients',{
        id:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        nombreApellido : {
            type: DataType.STRING ,
            allowNull:false,
            validate :{
                notEmpty : true
            }
        },
        direccion :{
            type: DataType.STRING ,
            allowNull:false,
            validate :{
                notEmpty : true
            }
        },
        email : {
            type : DataType.STRING,
            unique : true,
            allowNull:false,
        }
        
    })

    
    return clients;
};

