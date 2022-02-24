const express = require('express')
const router = express.Router()
const Sale = require('../models/Sale')

router.get('/', async (req,res)=>{
    try{
        const sales = await Sale.find()
        res.json(sales)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const sale = await Sale.findById(req.params.id)
        res.json(sale)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

router.post('/add', async (req,res)=>{
    const sale = new Sale({
        subtotal: req.body.subtotal,
        total: req.body.total,
        products: req.body.products,
    })
    try{
        const savedSale = await sale.save()
        res.json(savedSale)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
}) 

router.delete('/:id', async (req,res)=>{
    try{
        const removedSale = await Sale.remove( {_id : req.params.id})
        res.json(removedSale)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

router.patch('/:id', async (req,res)=>{
    try{
        const updatedSale = await Sale.updateOne(
             {_id : req.params.id},
             {$set: {  subtotal: req.body.subtotal, total: req.body.total, products: req.body.products,}}
             )
        res.json(updatedSale)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})


module.exports = router