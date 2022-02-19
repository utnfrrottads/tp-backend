const express = require('express')
const router = express.Router()
const Discount = require('../models/Discount')

router.get('/', (req,res)=>{
    Discount.find({}, (err, discounts)=>{
        if (err) throw err
        res.send(discounts)
    })
})

router.post('/add', async (req,res)=>{
    const discount = new Discount({

        })
    try{
        const savedDiscount = await discount.save()
        res.json(savedDiscount)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
}) 

module.exports = router