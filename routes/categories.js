const express = require('express')
const router = express.Router()
const Category = require('../models/Category')

router.get('/', async (req,res)=>{
    try{
        const categories = await Category.find()
        res.json(categories)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const category = await Category.findById(req.params.id)
        res.json(category)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

router.post('/add', async (req,res)=>{
    const category = new Category({
        name: req.body.name,
        description: req.body.description,
        })
    try{
        const savedCategory = await category.save()
        res.json(savedCategory)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
}) 

router.delete('/:id', async (req,res)=>{
    try{
        const removedCategory = await Category.remove( {_id : req.params.id})
        res.json(removedCategory)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

router.patch('/:id', async (req,res)=>{
    try{
        const updatedCategory = await Category.updateOne(
             {_id : req.params.id},
             {$set: {name: req.body.name, description: req.body.description}}
             )
        res.json(updatedCategory)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

module.exports = router