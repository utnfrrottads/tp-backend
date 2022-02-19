const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

router.get('/', (req,res)=>{
    Product.find({}, (err, products)=>{
        if (err) throw err
        res.send(products)
    })
})

router.post('/add', async (req,res)=>{
    const product = new Product({

        })
    try{
        const savedProduct = await product.save()
        res.json(savedProduct)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
}) 

module.exports = router