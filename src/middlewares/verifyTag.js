const validator = require('validator');

const verifyTag = (req,res,next) => {
    const {description} = req.body;


    if(description && validator.isLength(description, {min: 4, max:undefined})) return next();

    res.status(400).send({success:false, errors:{
        description: "description must be at least 4 characters"
    }})

};

module.exports = verifyTag;

