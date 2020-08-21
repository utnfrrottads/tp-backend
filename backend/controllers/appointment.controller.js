const Appointment = require('../models/appointment.model');
const User = require('../models/user.model');
const Field = require('../models/field.model');

const { request , response } = require('express');

const appointmentCtrl = {};

appointmentCtrl.getAppointments = async (req = request, res = response) =>{
    try {
        const appointments = await Appointment.find()
                                            .populate('user','name')
                                            .populate('field','name')
        res.json({
            ok:true,
            msg:'Found Appointments',
            appointments
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'An unexpected error ocurred'
        })
    }
}

appointmentCtrl.getAppointment = async (req = request, res = response) =>{
    const id = req.params.id
    try {
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({
                ok:false,
                msg:'Unknown ID. Please insert a correct Appointment ID'
            })
        }
        res.json({
            ok:true,
            msg:'Found Appointment',
            appointment
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'An unexpected error ocurred'
        })
    }
}

appointmentCtrl.createAppointment = async (req = request, res = response) =>{
    try {
        const appointment = new Appointment(req.body)
        appointment.createdDate = (Date.now()- process.env.UTC_ARG);
        await appointment.save()
        res.json({
            ok:true,
            msg:'Created Appointment',
            appointment
        })
    } catch (error) {
        console.log(error);
        if (error.name === 'MongoError' && error.code === 11000) {
            return res.status(400).json({
                    ok:false,
                    msg:'The Field is already reserved for the requested date'
            })
        }
        res.status(500).json({
            ok:false,
            msg:'An unexpected error ocurred'
        })
    }
}

appointmentCtrl.updateAppointment = async (req = request, res = response) =>{
    const id = req.params.id;
    try {
        const appointmentDB = await Appointment.findById(id);
        if(!appointmentDB){
            return res.status(404).json({
                ok:false,
                msg:'Unknown ID. Please insert a correct Appointment ID'
            })
        }
        const changes = req.body
        changes.createdDate = (Date.now()- process.env.UTC_ARG);
        if(changes.date === appointmentDB.date){
            return res.status(400).json({
                ok:false,
                msg:'The date entered is the same'
            })
        }
        await Appointment.findByIdAndUpdate(id,changes,{new:true})
        res.json({
            ok:true,
            msg:'Updated Appointment'
        })
    } catch (error) {
        console.log(error);
        if (error.name === 'MongoError' && error.code === 11000) {
            return res.status(400).json({
                    ok:false,
                    msg:'The Field is already reserved for the requested date'
            })
        }
        res.status(500).json({
            ok:false,
            msg:'An unexpected error ocurred'
        })
    }
}

appointmentCtrl.deleteAppointment = async (req = request, res = response) =>{
    const id = req.params.id;
    try {
        const appointmentDB = await Appointment.findById(id);
        if (!appointmentDB) {
            return res.status(404).json({
                ok:false,
                msg:'Unknown ID. Please insert a correct Appointment ID'
            })
        }
        await Appointment.findByIdAndDelete(id);
        res.json({
            ok:false,
            msg:'Deleted Appointment'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'An unexpected error ocurred'
        })
    }
}

appointmentCtrl.getUserAppointments = async (req = request , res = response) => {
    const userID = req.uid;
    try {
        const userDB = await User.findById(userID)
        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg:'Unknown ID. Please insert a correct User ID'
            })
        }
        const appointments = await Appointment.find({user: userID})
                                            .populate('user','name')
                                            .populate('field','name')
        appointments.sort((elem1,elem2)=>{
            return (elem2.date.getTime() - elem1.date.getTime())
        })
        res.json({
            ok:true,
            msg:'Found Appointments',
            appointments
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'An unexpected error ocurred'
        })
    }
}


appointmentCtrl.getAvailableAppointments = async (req = request , res = response) =>{
            const fieldID = req.params.field
        const query1 = req.query.dateSince;
        const query2 = req.query.dateUntil;
        let dateSince =new Date(query1)
        let dateUntil = new Date(query2)
        hours = new Date().getHours()
        try {
            sinceTime = dateSince.getTime()
            untilTime = dateUntil.getTime() 
            
            const fieldDB = await Field.findById(fieldID)
            if(!fieldDB){
                return res.status(404).json({
                            ok:false,
                            msg:'Unknown ID. Please insert a correct Field ID'
                        })
            }
            let available = new Array
            
            do {
                let openingTime = (fieldDB.openingHour.getHours() * 3600000) 
                let closingTime = (fieldDB.closingHour.getHours() * 3600000) 
                do {
                    date = new Date(sinceTime + openingTime + 10800000)
                    available.push(date)
                    openingTime = openingTime + 3600000
                } while (openingTime <= closingTime );
                sinceTime = sinceTime + 86400000
             } while (sinceTime <= untilTime);
            
             let reserved = new Array
             let arrayReserved = new Array
             reserved = await Appointment.find({field:fieldID},'date')
             reserved.forEach(element =>{
                 arrayReserved.push(element.date)
             })
             arrayReserved.sort((elem1,elem2)=>{
                 return (elem1.getTime() - elem2.getTime())
             })
            // if(arrayReserved.length === 0){
                 for (let i = 0; i < available.length; i++) {
                     for (let j = 0; j < arrayReserved.length; j++) {
                         if((available[i].getTime()) === (arrayReserved[j].getTime())) {
                             available.splice(i,1)
                         }
                     }     
                 }
             //}
             console.log(arrayReserved)
            console.log(available)
            res.json({
                ok:true,
                msg:'todo okey',
                available
            })
            
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'An unexpected error ocurred'
        })
    }
}

module.exports = appointmentCtrl;

