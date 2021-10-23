module.exports = (sequelize, DataType) =>{
    const Usuarios = sequelize.define('Usuarios',{
        id:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario:{
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        password:{
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        rol:{
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        activo:{
            type: DataType.BOOLEAN,
            allowNull: false
        }
    },{
        timestamps: false
    });

    Usuarios.hasAsociation = ()=>{
        return false;
    }

    return Usuarios;
}
