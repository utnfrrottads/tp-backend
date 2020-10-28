const User = require ('../models/user.model');
const {request, response} = require('express');
const UserType = require ('../models/userType.model')
const authCtrl ={};

const {generateJWT} = require ('../helpers/jwt');
//Encripta psw
const bycript = require('bcryptjs');

authCtrl.login = async(req = request,res = response)=>{
    const { email, password} = req.body;
    const type = req.body.type
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
            });
        }
        const userType = await UserType.findById(userDB.role);
        if(userType.description !== type){
            return res.status(403).json({
                ok:false,
                msg:'User does not have permission'
            });
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
                            .populate('role','description')
    if(!user){
        return console.log('NO ENCUENTRA USUARIO')
    }
    res.json({
        ok:true,
        user,
        token: token
    })
}


module.exports = authCtrl;