export default {
	Query: {
		staffs: (_, args, { db }) => db.staff.findAll(),
		staff: (_, { id }, { db }) => db.staff.findByPk(id),
	},
	Mutation: {
		createStaff: (_, { staff }, { db }) => db.staff.create(staff),
		deleteStaff: (_, { id }, { db }) => db.staff.destroy({ where: { id } }),
		updateStaff: (_, { id, staff }, { db }) =>
			db.staff
				.update(staff, { where: { id } })
				.then(() => db.staff.findByPk(id)),
	},
};
