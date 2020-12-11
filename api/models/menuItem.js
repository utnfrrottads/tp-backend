export default (sequelize, DataTypes) => {
	const Item = sequelize.define('item', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: DataTypes.STRING,
		desc: DataTypes.STRING,
		cookTime: DataTypes.INTEGER,
		servings: DataTypes.REAL,
		pricePerUnit: DataTypes.REAL,
	});

	Item.associate = async (models) => {
		Item.belongsToMany(models.category, { through: 'categories_items' });

		Item.hasMany(models.line);

		Item.belongsToMany(models.ingredient, { through: 'ingredients_items' });
	};

	return Item;
};
