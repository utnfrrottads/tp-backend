const express = require('express')
const router = express.Router()
const model = require('../models/Provider')

router.get('/', (req,res)=>{
    model.find({}, (err, provider)=>{
        if (err) throw err
        res.send(provider)
    })
})


router.post('/product/add', (req,res)=>{
    let body = req.body
    console.log(body)
    model.create(body, (err, provider)=>{
        if (err) throw err
        res.send(body)
    })
})

module.exports = router