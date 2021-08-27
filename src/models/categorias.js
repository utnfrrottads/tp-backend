module.exports = (sequelize, DataType) =>{
    const Categorias = sequelize.define('Categorias',{
        idCategoria:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion:{
            type: DataType.STRING,
            allowNull: false
        }
    });

    Categorias.hasAsociation = ()=>{
        return true;
    }

    Categorias.associate = (models)=>{
        Categorias.hasMany(models.Productos,{
            foreignKey:{
                allowNull:false
            }
        });
    };

    return Categorias;

};   