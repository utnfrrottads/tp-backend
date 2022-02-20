const express = require('express')
const router = express.Router()
const Provider = require('../models/Provider')

router.get('/', (req,res)=>{
    Provider.find({}, (err, providers)=>{
        if (err) throw err
        res.send(providers)
    })
})

router.get('/:id', async (req,res)=>{
    try{
        const provider = await Provider.findById(req.params.id)
        res.json(provider)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

router.post('/add', async (req,res)=>{
    const provider = new Provider({
            name: req.body.name,
            email: req.body.email,
            addres: req.body.addres,
            phone: req.body.phone

        })
    try{
        const savedProvider = await provider.save()
        res.json(savedProvider)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
}) 

router.delete('/:id', async (req,res)=>{
    try{
        const removedProvider = await Provider.remove( {_id : req.params.id})
        res.json(removedProvider)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

module.exports = router