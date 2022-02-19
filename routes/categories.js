const express = require('express')
const router = express.Router()
const Category = require('../models/Category')

router.get('/', (req,res)=>{
    Category.find({}, (err, categories)=>{
        if (err) throw err
        res.send(categories)
    })
})

router.post('/add', async (req,res)=>{
    const category = new Category({

        })
    try{
        const savedCategory = await category.save()
        res.json(savedCategory)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
}) 

module.exports = router