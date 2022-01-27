const express = require('express')
const router = express.Router()
const model = require('../models/Product')

router.get('/', (req,res)=>{
    model.find({}, (err, products)=>{
        if (err) throw err
        res.send(products)
    })
})


router.post('/product/add', (req,res)=>{
    let body = req.body
    console.log(body)
    model.create(body, (err, products)=>{
        if (err) throw err
        res.send(body)
    })
})

module.exports = router