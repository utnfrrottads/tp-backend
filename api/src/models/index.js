const Customer = require('./customer');
const Configuration = require('./configuration');
const Mechanic = require('./mechanic');
const Repair = require('./repair');
const RepairSpare = require('./repairSpare');
const Role = require('./role');
const SparePart = require('./sparePart');
const Shift = require('./shift');
const User = require('./user');
const Vehicle = require('./vehicle');


// Asociaciones
const initAssociations = () => {
    // Shift & Customer
    Customer.hasMany(Shift, { foreignKey: 'customerId' });
    Shift.belongsTo(Customer, { foreignKey: 'customerId' });

    // Vehicle & Customer
    Customer.hasMany(Vehicle, { foreignKey: 'customerId' });
    Vehicle.belongsTo(Customer, { foreignKey: 'customerId' });

    // Repair & Vehicle
    Vehicle.hasMany(Repair, { foreignKey: 'vehicleId' });
    Repair.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

    // Repair & Mechanic
    Mechanic.hasMany(Repair, { foreignKey: 'mechanicId' });
    Repair.belongsTo(Mechanic, { foreignKey: 'mechanicId' });

    //FIXME: Forma 1
    // // Repair & Spare across RepairSpare        
    // // Repair & RepairSpare
    // Repair.hasMany(RepairSpare, { foreignKey: 'repairId' });
    // RepairSpare.belongsTo(Repair, { foreignKey: 'repairId' });
            
    // // Spare & RepairSpare
    // SparePart.hasMany(RepairSpare, { foreignKey: 'spareId' });
    // RepairSpare.belongsTo(SparePart, { foreignKey: 'spareId' });

    // FIXME: Forma 2
    // Repair & Spare across RepairSpare
    Repair.belongsToMany(SparePart, { through: 'RepairSpare', unique: false, foreignKey: 'repairId' });
    SparePart.belongsToMany(Repair, { through: 'RepairSpare', unique: false, foreignKey: 'sparePartId' });

    // Mechanic & User
    Mechanic.hasOne(User, { foreignKey: 'mechanicId' });
    User.belongsTo(Mechanic, { foreignKey: 'mechanicId' });

    // FIXME: Falta la asociación entre User y Role
};

initAssociations();

module.exports = {
    Customer,
    Configuration,
    Mechanic,
    Repair,
    RepairSpare,
    Role,
    SparePart,
    Shift,
    User,
    Vehicle
};