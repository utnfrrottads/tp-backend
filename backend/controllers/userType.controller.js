const UserType = require ('../models/userType.model');
const { request, response} = require ('express');
const userTypeCtrl = {};    

userTypeCtrl.getUserTypes = async (req,res = response)=>{
    try {
        const userTypes = await UserType.find()
        res.json({
            ok: true,
            msg:'Found userTypes',
            userTypes
        })
        
    } catch (error) {
        console.log(error);
        res.stat(500).json({
            ok:false,
            msg:'An unexpected error occurred'
        })
    }
}
userTypeCtrl.getUserType = async (req = request,res = response)=>{
    const id = req.params.id;
    try {
        const userType = await UserType.findById(id)
        if(!userType){
            return res.status(404).json({
                ok:false,
                msg:'Unknown ID. Please insert a correct UserType ID'
            })
        }
        res.json({
            ok: true,
            msg:'Found userType',
            userType
        })
        
    } catch (error) {
        console.log(error);
        res.stat(500).json({
            ok:false,
            msg:'An unexpected error occurred'
        })
    }
}

userTypeCtrl.createUserType = async (req = request, res=response)=>{
    try {
        const userType = new UserType(req.body);
        await userType.save();
        res.json({
            ok:true,
            msg:'Created userType'
        })    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'An unexpected error ocurred'
        })
    }
    
}

userTypeCtrl.updateUserType = async (req = request, res = response) =>{
    const id = req.params.id
    try {
        const userTypeBD = await UserType.findById(id)
        if(!userTypeBD){
            return res.status(404).json({
                ok:false,
                msg:'Unknown ID. Please insert a correct UserType ID'
            })
        }
        const changes = {
            description : req.body.description
        };
        const usertype = await UserType.findByIdAndUpdate(id,changes,{new:true})
        res.json({
            ok:true,
            msg:'Updated userType',
            usertype
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'An unexpected error ocurred'
        })
    }
}

userTypeCtrl.deleteUserType = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const userTypeBD = await UserType.findById(id);
        if (!userTypeBD){
            return res.status(404).json({
                ok:false,
                msg:'Unknown ID. Please insert a correct UserType ID'
            })
        }
        await UserType.findByIdAndDelete(id);
        res.json({
            ok:true,
            msg:'Deleted userType'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'An unexpected error ocurred'
        })
    }
}


module.exports = userTypeCtrl;