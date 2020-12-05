export default (sequelize, DataTypes) => {
	const Recipe = sequelize.define('recipe', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		quantity: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
	});

	Recipe.associate = (models) => {
		Recipe.belongsTo(models.ingredient);

		Recipe.belongsTo(models.item);
	};

	return Recipe;
};
