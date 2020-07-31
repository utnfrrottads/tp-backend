const mongoose = require('mongoose');

const {Schema , model} = mongoose;

const FieldSchema = new Schema({
    name:{type:String, required: true, unique:true},
    description:{type:String},
    price:{type:Number, required: true},
    phone:{type:String},
    address:{type:String},
    cantPlayers:{type:Number}
},{collection:'fields'})

UsuarioSchema.method('toJSON',function(){
    const {__v,_id, ...object}=this.toObject();
    object.id = _id;
    return object;
})

module.exports= model('Field',FieldSchema);