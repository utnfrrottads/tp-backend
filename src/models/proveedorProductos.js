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
        return true;
    }

    ProveedorProductos.associate = (models) =>{



        ProveedorProductos.belongsTo(models.Productos);

        ProveedorProductos.belongsTo(models.Proveedores, { as: 'Proveedor' });

        //ProveedorProductos.sync({force: true}) //alter { force: true }

    }

    return ProveedorProductos;
};
