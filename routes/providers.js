const express = require('express')
const router = express.Router()
const model = require('../models/Provider')

router.get('/', (req,res)=>{
    model.find({}, (err, providers)=>{
        if (err) throw err
        res.send(providers)
    })
})


router.post('/provider/add', (req,res)=>{
    let body = req.body
    console.log(body)
    model.create(body, (err, providers)=>{
        if (err) throw err
        res.send(body)
    })
})

module.exports = router