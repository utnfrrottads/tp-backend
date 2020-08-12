const User = require ('../models/user.model');
const { request, response} = require ('express');
const userCtrl = {};
const bycript = require('bcryptjs');
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
//SE EXTRAE EL ROLE DEL HEADER
    const role = 'USER';
    try {
        const existsEmail = await User.findOne({email});
        if(existsEmail){
            return res.status(400).json({
                ok:false,
                msg:'An user already exists with this email'
            })
        }
        const user = new User(req.body);
//ACA SE HACE LA ASIGNACION DEL ROLE (REVISAR EL TEMA DE VARIABLES DE ENTORNO)
        if (role==='USER'){
            user.role=process.env.USER;
        }
        if (role==='CENTER_ADMIN'){
            user.role=process.env.CENTER_ADMIN;
        }
        if (role==='GENERAL_ADMIN'){
            user.role=process.env.GENERAL_ADMIN;
        }
        const salt = bycript.genSaltSync();
        user.password = bycript.hashSync(password,salt);
        await user.save();
//GENERAR JWT
        const token =  await generateJWT(user.uid)
        res.json({
            ok:true,
            msg: 'Created User',
            token
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

module.exports = userCtrl;