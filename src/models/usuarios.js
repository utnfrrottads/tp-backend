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
        clave:{
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        rol:{
            type: DataType.STRING,
            validate: {
                isIn:[['administrador','compras', 'ventas', 'supervisor']]
            }
        },
        activo:{
            type: DataType.BOOLEAN,
            allowNull: false
        }
    });

    Usuarios.hasAsociation = ()=>{
        return false;
    }

    Usuarios.associate = (models)=>{
        //Usuarios.sync({alter:true});
    }

    return Usuarios;
}

