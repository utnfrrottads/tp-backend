const express = require('express')
const router = express.Router()
const Sale = require('../models/Sale')

router.get('/', (req,res)=>{
    Sale.find({}, (err, sales)=>{
        if (err) throw err
        res.send(sales)
    })
})

router.post('/add', async (req,res)=>{
    const sale = new Sale({

    })
    try{
        const savedSale = await sale.save()
        res.json(savedSale)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
}) 

module.exports = router