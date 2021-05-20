//An appointment can only be canceled one hour before the start time


const Appointment = require('../models/appointment.model')

const validateMaxTime = async (req,res,next) => {
    const id = req.params.id
    const appointmentDB = await Appointment.findById(id);
    const createdDate = appointmentDB.createdDate.getTime();
    const initDate = appointmentDB.date.getTime();
    const now =  (Date.now()-process.env.UTC_ARG)
    
//Max time for cancel (1hr)
    const maxTimeBefore = 3600000;

    if((initDate-now)<maxTimeBefore){
        return res.status(400).json({
            ok:false,
            msg:'Less than 1 hour left for appointment start time'
        })
    }
    next();
        
    
}

module.exports = {validateMaxTime};