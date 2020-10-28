const {request, response} = require('express');
const path = require('path')
const fs = require ('fs')
//ID generator
const { v4: uuidv4 } = require('uuid');
//Helper
const {updateImage} = require('../helpers/updateImage');

const uploadCtrl ={};

uploadCtrl.fileUpload = async (req = request,res=response)=>{
    const type = req.params.type;
    const id = req.params.id;
    //Types validators 
    const validTypes = ['user','field'];
    if(!validTypes.includes(type)){
        return res.status(400).json({
            ok:false,
            msg:'Only users and fields can upload images'
        });
    }
    //Validate if exists a file
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'File does not exist'
        });
      }
    //Process file
    const file = req.files.image;
    const nameSplit = file.name.split('.');
    const fileExtension = nameSplit[nameSplit.length-1].toLowerCase();
    //Validate extension
    const validExtension = ['png','jpg','jpeg'];
    if(!validExtension.includes(fileExtension)){
        return res.status(400).json({
            ok:false,
            msg:'The file extension is not allowed'
        });
    }
    //Create unique file name with uuidv4
    const fileName = `${uuidv4()}.${fileExtension}`;
    //Create the path to save the file in a specific folder
    const path =`./uploads/${type}/${fileName}`;
    //Move the image to the path
    file.mv(path, (err)=> {
        if (err){
          return res.status(500).json({
              ok:false,
              msg: 'An error ocurred while uploading a file'
          })
        }

    updateImage(type,id, fileName);
    res.json({
        ok: true,
        msg:'File upload',
        type,
        id
        })
    });
    
}
uploadCtrl.getImage = (req,res = response)=>{
    const type = req.params.type;
    const image = req.params.image;
    const imagePath = path.join(__dirname,`../uploads/${type}/${image}`);
    
    if(fs.existsSync(imagePath)){
        res.sendFile(imagePath);
    }else{
     const imagePath = path.join(__dirname,`../uploads/no-image.png`);
        res.sendFile(imagePath);
    }
}

module.exports= uploadCtrl;