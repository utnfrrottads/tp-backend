const User = require ('../models/user.model');
const {request, response} = require('express');
const authCtrl ={};

const {generateJWT} = require ('../helpers/jwt');
//Encripta psw
const bycript = require('bcryptjs');

authCtrl.login = async(req = request,res = response)=>{
    const { email, password} = req.body;
    const uid = req.uid
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
            token: token,
            uid
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

//OBTENER USUARIO
    const user = await User.findById(uid,{uid:1,name:1,address:1,phone:1,email:1,role:1})
    
    res.json({
        ok:true,
        user,
        token: token
    })
}


module.exports = authCtrl;