const express = require('express')
const router = express.Router()
const Discount = require('../models/Discount')

router.get('/', async (req,res)=>{
    try{
        const discounts = await Discount.find()
        res.json(discounts)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const discount = await Discount.findById(req.params.id)
        res.json(discount)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

router.post('/add', async (req,res)=>{
    const discount = new Discount({
        percentage: req.body.percentage,
        description: req.body.description,
        products: req.body.products,
        })
    try{
        const savedDiscount = await discount.save()
        res.json(savedDiscount)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
}) 

router.delete('/:id', async (req,res)=>{
    try{
        const removedDiscount = await Discount.remove( {_id : req.params.id})
        res.json(removedDiscount)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

router.patch('/:id', async (req,res)=>{
    try{
        const updatedDiscount = await Discount.updateOne(
             {_id : req.params.id},
             {$set: {description: req.body.description, products: req.body.products, percentage: req.body.percentage}}
             )
        res.json(updatedDiscount)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

module.exports = router