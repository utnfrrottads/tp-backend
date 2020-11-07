const Appointment = require('../models/appointment.model');
const User = require('../models/user.model');
const Field = require('../models/field.model');
const cron = require('node-cron');

const { request , response } = require('express');

const appointmentCtrl = {};

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
        if(appointmentDB.state !== 'Reserved'){
            return res.status(404).json({
                ok:false,
                msg:'The appointment cannot be deleted due to cancelation policies'
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
        const appointmentsDB = await Appointment.find({user: userID})
                                            .populate('user','name')
                                            .populate('field','name')
    
        let reservedAppointments = new Array;
        let completedAppointments = new Array;
        let inProgressAppointments = new Array;
        let aboutToStartAppointments = new Array;

        appointmentsDB.forEach(element=>{
            if(element.state==='AboutToStart'){
                aboutToStartAppointments.push(element)
            }
            if(element.state==='Reserved'){
                reservedAppointments.push(element)
            }
            if(element.state==='InProgress'){
                inProgressAppointments.push(element)
            }
            if(element.state==='Completed'){
                completedAppointments.push(element)
            }
        })
        sortDateFromSmallest(aboutToStartAppointments);
        sortDateFromSmallest(reservedAppointments);
        sortDateFromSmallest(inProgressAppointments);
        sortDateFromLargest(completedAppointments);

        res.json({
            ok:true,
            msg:'Found Appointments',
            appointments:{
                reservedAppointments,
                completedAppointments,
                inProgressAppointments,
                aboutToStartAppointments
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'An unexpected error ocurred'
        })
    }
}
sortDateFromSmallest = (array) => {
    array = array.sort((a,b)=>{
        if(a.date.getTime() > b.date.getTime()){
            return 1;
        }
        if(a.date.getTime() < b.date.getTime()){
            return -1
        }
    })
    return array
}
sortDateFromLargest = (array)=>{
    array = array.sort((a,b)=>{
        if(a.date.getTime() > b.date.getTime()){
            return -1;
        }
        if(a.date.getTime() < b.date.getTime()){
            return 1
        }
    })
    return array
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
                 for (let i = 0; i < available.length; i++) {
                     for (let j = 0; j < arrayReserved.length; j++) {
                         if((available[i].getTime()) === (arrayReserved[j].getTime())) {
                             available.splice(i,1)
                         }
                     }     
                 }
             for (let i = 0; i < available.length; i++) {
                if((available[i].getTime()) < ((new Date().getTime())- process.env.UTC_ARG)) {
                    available.splice(i,1)
                    i= i-1
                    }
            }     
            
            res.json({
                ok:true,
                msg:'Available Appointments',
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

cron.schedule('0,10,20,30,43,50 * * * *', async () => {
     try {
        const appointmentsDB = await Appointment.find()
        appointmentsDB.forEach(element=>{
            const difference = (element.date.getTime() - (new Date().getTime()- process.env.UTC_ARG))
            changeState(element,difference)
        })

     } catch (error) {
         console.log(error)
     }
 })

changeState = async (element,difference) =>{
    if(difference < 3600000 && difference > 0){
        const change={
            state: 'AboutToStart'
        }
        await Appointment.findByIdAndUpdate(element.id,change)
    }
    else if(difference<0 && difference> -3600000){
        const change={
            state: 'InProgress'
        }
        await Appointment.findByIdAndUpdate(element.id,change)
    }
    else if(difference< -3600000){
        const change={
            state: 'Completed'
        }
        await Appointment.findByIdAndUpdate(element.id,change)
    }
 }

module.exports = appointmentCtrl;

