module.exports = (sequelize, DataType)=>{

    const ProveedorProductos = sequelize.define('ProveedorProductos',{
    });

    ProveedorProductos.hasAsociation = ()=>{
        return false;
    }


    return ProveedorProductos;
};
