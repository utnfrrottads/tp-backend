export default (sequelize, DataTypes) => {
	const Staff = sequelize.define('staff', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: DataTypes.STRING,
		email: DataTypes.STRING,
		joinedDate: DataTypes.DATE,
		salary: DataTypes.REAL,
		birthDate: DataTypes.DATE,
	});

	Staff.associate = (models) => {
		Staff.hasMany(models.order);
	};

	return Staff;
};
