const sequelize = require('../database/db-connection');
const models = require('../models');
const { QueryTypes } = require('sequelize');


const getMaximumShiftsPerDay = async () => {
    const response = await models.Configuration.findAll({
        attributes: ['maximumShiftsPerDay']
    });
    
    return response[0].maximumShiftsPerDay;
};


const getNumberOfShiftsForGivenDate = async (shiftDate) => {
    const query = `SELECT count(*) AS "numberOfShiftsForGivenDate"
                  FROM shift 
                  WHERE shiftDate = ?`;

    const {numberOfShiftsForGivenDate} = await sequelize.query(query, { 
        type: QueryTypes.SELECT,
        replacements: [shiftDate],
        plain: true,
    });
    
    return numberOfShiftsForGivenDate;
};


const registerShift = async (data) => {
    const transaction = await sequelize.transaction();

    try {
        const newShift = await models.Shift.create(data, { transaction });
        await transaction.commit();
        
        return newShift;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


module.exports = {
    getMaximumShiftsPerDay,
    getNumberOfShiftsForGivenDate,
    registerShift
};