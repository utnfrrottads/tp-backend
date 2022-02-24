const router = require('express').Router();
const User = require('../models/User');

router.get('/', async (req,res)=>{
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        res.json(user)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})


router.post('/add', async (req, res) => {
    const user = new User({
        name: req.body.name,
        lastName: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
  })
  
router.delete('/:id', async (req,res)=>{
    try{
        const removeduser = await User.remove( {_id : req.params.id})
        res.json(removeduser)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

router.patch('/:id', async (req,res)=>{
    try{
        const updatedUser = await User.updateOne(
             {_id : req.params.id},
             {$set: {name: req.body.name, email: req.body.email, lastName: req.body.lastName, password: req.body.password}}
             )
        res.json(updatedUser)
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})


module.exports = router;