module.exports = (sequelize, dataType) => {
    const Productos = sequelize.define('Productos', {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: dataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        stock: {
            type: dataType.INTEGER,
            allowNull: false
        },
        cantidad_minima: {
            type: dataType.INTEGER,
            allowNull: false
        },
        precio_venta: {
            type: dataType.DECIMAL,
            allowNull: false
        },
        activo: {
            type: dataType.BOOLEAN,
            allowNull: false
        },
        categoria_id: {
            type: dataType.INTEGER,
            references: {
                model: 'Categorias',
                key: 'id'
            }
        }
    });

    Productos.belongsTo(sequelize.models.Categorias, { as: 'categoria', foreignKey: 'categoria_id' });

    return Productos;
};
