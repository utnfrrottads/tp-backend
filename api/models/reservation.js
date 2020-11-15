module.exports = (sequelize, DataTypes) => {
	const Reservation = sequelize.define('reservation', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		customerName:{
			type: DataTypes.STRING,
			allowNull: false
		},
		phone: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		partySize: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		reservationDateTime: {
			type: DataTypes.DATE,
			allowNull: false
		},
		cancelationDateTime: {
			type: DataTypes.DATE,
		}
	});

	Reservation.associate = (models) => {
		Reservation.belongsTo(models.table);
	};

	return Reservation;
};
   