//POR REGLA DE NEGOCIO SOLO SE PUEDE EDITAR  O CANCELAR EL TURNO HASTA 1 HORA DESPUES DE RESERVAR (maxTimeAfter)
// o HASTA 12 HORAS ANTES DE LA HORA DEL TURNO (maxTimeBefore)


const Appointment = require('../models/appointment.model')

const validateMaxTime = async (req,res,next) => {
    const id = req.params.id
    const appointmentDB = await Appointment.findById(id);
    const createdDate = appointmentDB.createdDate.getTime();
    const initDate = appointmentDB.date.getTime();
    const now =  (Date.now()-process.env.UTC)
    
//tiempo max post reserva (1hr)
    const maxTimeAfter =3600000;
//tiempo max antes del turno (12hr)
    const maxTimeBefore = 43200000;

    if((now-createdDate)>maxTimeAfter){
        return res.status(400).json({
            ok:false,
            msg:'An hour has passed after the reservation'
        })
    }else if((initDate-now)<maxTimeBefore){
        return res.status(400).json({
            ok:false,
            msg:'Less than 12 hours left for appointment start time'
        })
    }
    next();
        
    
}

module.exports = {validateMaxTime};