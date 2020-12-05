export default (sequelize, DataTypes) => {
	const OrderLine = sequelize.define('line', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		quantity: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		customerComments: DataTypes.STRING,
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.NOW,
		},
		canceledAt: DataTypes.DATE,
		startedAt: DataTypes.DATE,
		finishedAt: DataTypes.DATE,
		deliveredAt: DataTypes.DATE,
	});

	OrderLine.associate = (models) => {
		OrderLine.belongsTo(models.order);
		OrderLine.belongsTo(models.item);
	};

	return OrderLine;
};
