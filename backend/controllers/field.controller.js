const Field = require ('../models/field.model');
const { request, response} = require ('express');
const { search } = require('../routes/field.routes');
const fieldCtrl = {};

fieldCtrl.getFields = async (req = request , res = response) => {
    try {
        const fields = await Field.find();
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
fieldCtrl.getFieldsByParams = async (req = request , res = response) => {
    const text = req.params.search;
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
    try {
        //valida que el nombre no exista, pero en igual igual en cuanto a mayus y minus
        const existsName = await Field.findOne({name});
        if(existsName){
            return res.status(400).json({
                ok:false,
                msg:'A Field already exists whit this name'
            })
        }
        const fiel = new Field(req.body.params)
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
        await Field.findByIdAndDelete(id)
        res.json({
            ok:true,
            msg:'Deleted Field'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'An unexpected error ocurred'
        })
    }
}

module.exports = fieldCtrl;