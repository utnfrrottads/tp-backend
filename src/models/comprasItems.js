module.exports = (sequelize, DataType) => {

    const ComprasItems = sequelize.define('ComprasItems', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        precio: {
            type: DataType.REAL,
            allowNull: false
        },
        cantidad: {
            type: DataType.INTEGER,
            allowNull: false
        }
    });

    ComprasItems.hasAsociation = () => {
        return true;
    }

    ComprasItems.associate = (models) => {
        ComprasItems.belongsTo(models.Productos, { as: 'producto' });
    }

    return ComprasItems;
};
