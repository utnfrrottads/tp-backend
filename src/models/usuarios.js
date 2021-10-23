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
            },
            unique: true
        },
        password:{
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        rol:{
            type: DataType.STRING
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

    Usuarios.associate = (models)=>{
        //Usuarios.sync({force:true});
    }

    return Usuarios;
}
