module.exports = (sequelize, DataType) => {
    const Categorias = sequelize.define('Categorias', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: DataType.STRING,
            allowNull: false
        },
        activa: {
            type: DataType.BOOLEAN,
            allowNull: false
        }
    });

    Categorias.hasAsociation = () => {
        return true;
    }

    Categorias.associate = (models) => {
        Categorias.hasMany(models.Productos, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Categorias;
};