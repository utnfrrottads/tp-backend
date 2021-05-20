const User = require('../models/user.model');
const Field = require('../models/field.model');

const fs = require('fs');

const deleteImage = (path)=>{
    if(fs.existsSync(path)){
        //Delete old image
        fs.unlinkSync(path);
    }
}
const updateImage = async (type, id, fileName) =>{
    let oldPath ="";
    switch (type) {
        //Feature for user's images
        case 'user':
            const userDB = await User.findById(id);
            if(!userDB){
                return false;
            }
            oldPath= `./uploads/users/${userDB.image}`;
            deleteImage(oldPath);
            userDB.image= fileName;
            await User.save();
            return true
            
            break;
        case 'field':
            const fieldDB = await Field.findById(id);
            if(!fieldDB){
                return false
            }
            oldPath= `./uploads/fields/${fieldDB.image}`;
            deleteImage(oldPath);
            fieldDB.image = fileName;
            await fieldDB.save();
            return true
        
        break;
        default:
            break;
    }
}
module.exports= { updateImage }