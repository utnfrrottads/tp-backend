module.exports = (sequelize, DataTypes) => {
	const Table = sequelize.define('table', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		size:{
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		timestamps: false
	});

	Table.associate = (models) => {
		Table.hasMany(models.reservation);

		Table.hasMany(models.order);
	};

	return Table;
};
  