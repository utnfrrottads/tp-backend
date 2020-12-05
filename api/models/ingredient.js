export default (sequelize, DataTypes) => {
	const Ingredient = sequelize.define('ingredient', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		UnitOfMeasure: DataTypes.STRING,
		caloriesPerUnit: DataTypes.STRING,
	});

	Ingredient.associate = (models) => {
		Ingredient.hasMany(models.recipe);
	};

	return Ingredient;
};
