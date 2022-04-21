const mongoose = require('mongoose');

const verifyMongooseID = (req,res,next,id = undefined) =>{

    /*SI NO SE PASA UN ID COMO UN PARÁMETRO, LA FUNCIÓN VA A EVALUAR POR DEFECTO EL ID QUE SE PASA POR EL STRING DEL PARAM*/
    
    if (!mongoose.Types.ObjectId.isValid(id ?? req.params.id)) {
        res.status(400);
        res.send({success:false, message: "id must be a string of 12 bytes or a string of 24 hex characters or an integer"});
        return;
    };

    next();
};

module.exports = verifyMongooseID;