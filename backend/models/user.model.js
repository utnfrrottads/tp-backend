const mongoose = require('mongoose');

const {Schema , model} = mongoose;

const UserSchema = new Schema({
    name:{type:String, required: true},
    email:{type:String, required: true,lowercase:true, unique: true},
    password:{type:String, required: true},
    phone:{type:String, default:'No Phone'},
    address:{type:String,default:'No Address'},
    role:{type:Schema.Types.ObjectId,ref:'UserType',required:true},
},{collection:'users'})

UserSchema.method('toJSON',function(){
    const {__v,_id, ...object}=this.toObject();
    object.uid = _id;
    return object;
})

module.exports= model('User',UserSchema);