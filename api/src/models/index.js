const Client = require('./client');
const Configuration = require('./configuration');
const Mechanic = require('./mechanic');
const Repair = require('./repair');
const RepairSpare = require('./repairSpare');
const Role = require('./role');
const Spare = require('./spare');
const Turn = require('./turn');
const User = require('./user');
const Vehicle = require('./vehicle');


// Asociaciones
const initAssociations = () => {
    // Turn & Client
    Client.hasMany(Turn, { foreignKey: 'clientId' });
    Turn.belongsTo(Client, { foreignKey: 'clientId' });

    // Vehicle & Client
    Client.hasMany(Vehicle, { foreignKey: 'clientId' });
    Vehicle.belongsTo(Client, { foreignKey: 'clientId' });

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
    // Spare.hasMany(RepairSpare, { foreignKey: 'spareId' });
    // RepairSpare.belongsTo(Spare, { foreignKey: 'spareId' });

    // FIXME: Forma 2
    // Repair & Spare across RepairSpare
    Repair.belongsToMany(Spare, { through: 'RepairSpare', unique: false, foreignKey: 'repairId' });
    Spare.belongsToMany(Repair, { through: 'RepairSpare', unique: false, foreignKey: 'spareId' });

    // Mechanic & User
    Mechanic.hasOne(User, { foreignKey: 'mechanicId' });
    User.belongsTo(Mechanic, { foreignKey: 'mechanicId' });

    // FIXME: Falta la asociación entre User y Role
};

initAssociations();

module.exports = {
    Client,
    Configuration,
    Mechanic,
    Repair,
    RepairSpare,
    Role,
    Spare,
    Turn,
    User,
    Vehicle
};