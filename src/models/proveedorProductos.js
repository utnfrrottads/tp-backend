module.exports = (sequelize, DataType)=>{

    const ProveedorProductos = sequelize.define('ProveedorProductos',{
        precio:{
            type: DataType.REAL,
            allowNull: false
        },
        fechaPrecio:{
            type: DataType.DATE  
        }
    });

    ProveedorProductos.hasAsociation = ()=>{
        return false;
    }

    ProveedorProductos.associate = (models) =>{

        ProveedorProductos.sync({alter: true}) //alter { force: true }

    }

    return ProveedorProductos;
};
