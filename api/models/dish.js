module.exports = (sequelize, DataTypes) => {
  const Dish = sequelize.define('dish', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
  });
  return Dish;
};
