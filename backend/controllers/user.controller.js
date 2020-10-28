const User = require ('../models/user.model');
const { request, response} = require ('express');
const userCtrl = {};
const bycript = require('bcryptjs');
const UserType = require ('../models/userType.model');
const {generateJWT} = require ('../helpers/jwt')


userCtrl.getUsers = async (req,res = response)=>{
    try {
        const users = await User.find()
                                .populate('role','description');
        res.json({
            ok: true,
            msg:'Found users',
            users
        })
        
    } catch (error) {
        console.log(error);
        res.stat(500).json({
            ok:false,
            msg:'An unexpected error occurred'
        })
    }
}

userCtrl.getUser = async (req = request,res = response)=>{
    uid = req.params.uid;
    try {
        const user = await User.findById(uid)
                                .populate('role','description');
        if (!user) {
            return res.status(404).json({
                ok:false,
                msg:'Unknown ID. Please insert a correct User ID'
            })
        }
        res.json({
            ok: true,
            msg:'Found user',
            user
        })
        
    } catch (error) {
        console.log(error);
        res.stat(500).json({
            ok:false,
            msg:'An unexpected error occurred'
        })
    }
}

userCtrl.createUser = async (req = request, res = response) =>{
    const {email, password} = req.body
    try {
        const existsEmail = await User.findOne({email});
        if(existsEmail){
            return res.status(400).json({
                ok:false,
                msg:'An user already exists with this email'
            })
        }
        user = new User(req.body);
        usertype = (await UserType.findOne({description:req.body.role}))._id;
        user.role = usertype;
        const salt = bycript.genSaltSync();
        user.password = bycript.hashSync(password,salt);
        await user.save();
        res.json({
            ok:true,
            msg: 'Created User',
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'An unexpected error occurred'
        })
    }
}

userCtrl.updateUser = async (req = request, res = response) =>{
    const uid = req.params.id
    const email = req.body.email
    try {
        const userDB = await User.findById(uid);
        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg:'Unknown ID. Please insert a correct User ID'
            })
        }
        const changes = req.body;
        if(changes.email === userDB.email){
            delete changes.email
        }else{
            const existsEmail = await User.findOne({email});
            if(existsEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'An user already exists with this email'
                })
            }
        }
        if(changes.password === null){
            delete changes.password
        }else{
            const salt = bycript.genSaltSync();
            changes.password = bycript.hashSync(changes.password,salt);
        }
        await User.findByIdAndUpdate(uid,changes,{new:true})
        res.json({
            ok:true,
            msg:'Updated User'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'An unexpected error occurred'
        })
    }
}

userCtrl.deleteUser = async (req = request, res = response) =>{
    const uid = req.params.id;
    try {
        const userDB = await User.findById(uid);
        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg:'Unknown ID. Please insert a correct User ID'
            })
        }
        await User.findByIdAndDelete(uid);
        res.json({
            ok:true,
            msg:'Deleted User'
        })        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'An unexpected error occurred'
        })
    }
}

userCtrl.getUserType = async (req = request, res = response) =>{
    const userTypeID = req.params.userTypeID;
    try {
        const userType = await UserType.findById(userTypeID);
        if(!userType){
            return res.status(404).json({
                ok:false,
                msg:'Unknown ID. Please insert a correct User ID'
            })
        }
        res.json({
            ok:true,
            msg:'UserType Found',
            userType
        })    
    } catch (error) {
        
    }
}

module.exports = userCtrl;