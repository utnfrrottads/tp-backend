module.exports = (sequelize, DataType) => {

    const Items = sequelize.define('Items', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cantPedida: {
            type: DataType.INTEGER,
            allowNull: true
        }
    });

    Items.hasAsociation = () => {
        return true;
    }

    Items.associate = (models) => {
        Items.belongsTo(models.Ventas);
        Items.belongsTo(models.Productos);
    };

    return Items;
};
