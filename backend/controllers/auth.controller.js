const User = require ('../models/user.model');
const {request, response} = require('express');
const authCtrl ={};

const {generateJWT} = require ('../helpers/jwt');
//Encripta psw
const bycript = require('bcryptjs');

authCtrl.login = async(req = request,res = response)=>{
    const { email, password} = req.body;
    try {
        const userDB = await  User.findOne({email});
        if (!userDB){
            return res.status(404).json({
                ok:false,
                msg:"Wrong email or password"
            })
        }
        const validatePassword = bycript.compareSync(password , userDB.password);
        if(!validatePassword){
            return res.status(404).json({
                ok:false,
                msg:"Wrong email or password"
            })
        }
//GENERAR JWT
        const token =  await generateJWT(userDB.id)

        res.json({
            ok: true,
            msg:"User logged in",
            token: token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"An unexpected error occurred"
        })
    }
}

authCtrl.renewToken = async (req,res)=>{
    const uid = req.uid;
//GENERAR JWT
    const token =  await generateJWT(uid)    
    res.json({
        ok:true,
        uid,
        token: token
    })
}


module.exports = authCtrl;