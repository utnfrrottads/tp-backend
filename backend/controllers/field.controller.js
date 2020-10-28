const Field = require ('../models/field.model');
const Appointments = require ('../models/appointment.model');

const { request, response} = require ('express');
const fieldCtrl = {};


fieldCtrl.getFields = async (req = request , res = response) => {
    const text = req.query.search
    const regex = new RegExp(text,'i');
    try {
        const fields = await Field.find({name: regex});
        res.json({
            ok:true,
            msg:'Found Fields',
            fields
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'An unexpected error occurred'
        })
    }
}
fieldCtrl.getFieldsByCenterAdmin = async (req = request , res = response) => {
    const id = req.params.id
    const text = req.query.search
    const regex = new RegExp(text,'i');
    try {
        const fields = await Field.find({$and:[{name: regex},{user:id}]});
        res.json({
            ok:true,
            msg:'Found Fields',
            fields
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'An unexpected error occurred'
        })
    }
}

fieldCtrl.getField = async (req = request , res = response) => {
    const id = req.params.id
    try {
        const field = await Field.findById(id);
        if(!field){
            return res.status(404).json({
                ok:false,
                msg:'Unknown ID. Please insert a correct Field ID'
            })
        }
        res.json({
            ok:true,
            msg:'Found Field',
            field
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'An unexpected error occurred'
        })
    }
}

fieldCtrl.createField = async (req = request , res = response) => {
    name = req.body.name;
    openingHour = req.body.openingHour;
    closingHour = req.body.closingHour;
    try {
        //valida que el nombre no exista, pero en igual igual en cuanto a mayus y minus
        const existsName = await Field.findOne({name});
        if(existsName){
            return res.status(400).json({
                ok:false,
                msg:'A Field already exists whit this name'
            })
        }
        const body = req.body;
        body.openingHour = setDate(req.body.closingHour)
        body.closingHour = setDate(req.body.closingHour)
        console.log(body.openingHour)
        console.log(body.closingHour)
        const field = new Field(body)
        await field.save(); 
        res.json({
            ok:true,
            msg:'Created Field',
            field
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'An unexpected error ocurred'
        })
    }
}
fieldCtrl.updateField = async (req = request , res = response) => {
    const id = req.params.id;
    const name = req.body.name;
    try {
        const fieldBD = await Field.findById(id);
        if (!fieldBD) {
            return res.status(404).json({
                ok:false,
                msg:'Unknown ID. Please insert a correct Field ID'
            })
        };
        const changes = req.body;
        changes.openingHour= setDate(req.body.openingHour)
        changes.closingHour= setDate(req.body.closingHour)
        if(changes.name === fieldBD.name){
            delete changes.name
        }else{
            const existsName = await Field.findOne({name});
            if(existsName){
                return res.status(400).json({
                    ok:false,
                    msg:'A Field already exists whit this name'
                })
            }
        }
        await Field.findByIdAndUpdate(id,changes,{new:true})
        res.json({
            ok:true,
            msg:'Updated Field'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'An unexpected error ocurred'
        })
    }
}

fieldCtrl.deleteField = async ( req = request, res = response) => {
    const id = req.params.id
    try {
        const fieldDB = await Field.findById(id);
        if (!fieldDB) {
            return res.status(404).json({
                ok:false,
                msg:'Unknown ID. Please insert a correct Field ID'
            })
        }
        const appointments = await Appointments.find({field: id})
        console.log("turnos" ,appointments)
        if(appointments.length>0){
            return res.status(404).json({
                ok:false,
                msg:'Cannot delete a Field with pending appointments'
            })
        }
        else{
            await Field.findByIdAndDelete(id)
            res.json({
                ok:true,
                msg:'Deleted Field'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'An unexpected error ocurred'
        })
    }
}

function setDate(hour){
    const date = new Date(`1970/01/01 ${hour}:00`) 
    return new Date(date.getTime() - process.env.UTC_ARG)
}
module.exports = fieldCtrl;