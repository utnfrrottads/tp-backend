
module.exports = (sequelize, dataType) => {
    const Categorias = sequelize.define('Categorias', {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: dataType.STRING,
            allowNull: false
        },
        activa: {
            type: dataType.BOOLEAN,
            allowNull: false
        }
    });

    Categorias.hasAsociation = () => {
        return false;
    }

    return Categorias;
};