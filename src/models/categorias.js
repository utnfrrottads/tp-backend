
module.exports = (sequelize, dataType) => {
    return sequelize.define('Categorias', {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcionCate: {
            type: dataType.STRING,
            allowNull: false
        },
        activa: {
            type: dataType.BOOLEAN,
            allowNull: false
        }
    });
};