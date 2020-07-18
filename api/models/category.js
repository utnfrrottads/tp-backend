module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    desc: DataTypes.STRING,
  });

  Category.associate = (models) => {
    Category.belongsToMany(models.item, { through: 'categories_items' });
  };

  return Category;
};
