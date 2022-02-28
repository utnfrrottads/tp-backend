const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

router.get('/', async (req,res)=>{
    try{
        const products = await Product.find()
        res.json(products)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        res.json(product)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

router.post('/add', async (req,res)=>{
    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,

    })
    try{
        const savedProduct = await product.save()
        res.json(savedProduct)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
}) 

router.delete('/:id', async (req,res)=>{
    try{
        const removedProduct = await Product.remove( {_id : req.params.id})
        res.json(removedProduct)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

router.patch('/:id', async (req,res)=>{
    try{
        const updatedProduct = await Product.updateOne(
             {_id : req.params.id},
             {$set: {name: req.body.name, category: req.body.category, price: req.body.price}}
             )
        res.json(updatedProduct)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

module.exports = router