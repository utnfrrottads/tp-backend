const express = require('express')
const router = express.Router()
const Provider = require('../models/Provider')

router.get('/', (req,res)=>{
    Provider.find({}, (err, providers)=>{
        if (err) throw err
        res.send(providers)
    })
})

router.post('/add', async (req,res)=>{
    const provider = new Provider({
            name: req.body.name,
            email: req.body.email,
            addres: req.body.addres
        })
    try{
        const savedProvider = await provider.save()
        res.json(savedProvider)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
}) 

module.exports = router