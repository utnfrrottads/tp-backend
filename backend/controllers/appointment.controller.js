const Appointment = require('../models/appointment.model');
const User = require('../models/user.model');
const Field = require('../models/field.model');

const { request , response } = require('express');
const { findById } = require('../models/appointment.model');
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
        appointment.createdDate = (Date.now()- process.env.UTC);
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
        changes.createdDate = (Date.now()- process.env.UTC);
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


module.exports = appointmentCtrl;

