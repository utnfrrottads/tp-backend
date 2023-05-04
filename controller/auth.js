


const User = require('../models/User');

const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");



const SignIn = async (req, res) =>{


    const{username, password} = req.body;
    
    try{


        const user = await User.findOne({name: username})



        const passwordMatch = await bcrypt.compare(password, user.password);
        
        
        user.password = undefined; //Borro para no enviarlo al front


        
        if(!passwordMatch){
            res.status(401);
            return res.json({ errors: [{ customer: 'Incorrect password' }] });    
        }
        
        console.log(user)
        const payload = {user}
  

    const jwt = JWT.sign(payload, "Secretito",{expiresIn: '1h'})
    
    
    return res.json({jwt})
        

    }
    catch(err){
        res.status(404); // Customer not found
        return res.send({ errors: [{ customer: 'Username is not in database' }, err] });
    }


}

module.exports = {

    SignIn
}
