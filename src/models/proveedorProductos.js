module.exports = (sequelize, DataType)=>{

    const ProveedorProductos = sequelize.define('ProveedorProductos',{
        
        id:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fechaPrecio:{
            type: DataType.DATE,
            allowNull: false ,
           // unique:'claveCompuesta'
        },
        precio:{
            type: DataType.REAL,
            allowNull: false
        } 
    },
    {
        timestamps: false
    }
    );

    ProveedorProductos.hasAsociation = ()=>{
        return false;
    }

    ProveedorProductos.associate = (models) =>{

        //ProveedorProductos.sync({alter: true}) //alter { force: true }
 
    }

    return ProveedorProductos;
};
