const mongoose = require('mongoose');

const {Schema , model} = mongoose;

const UserTypeSchema = new Schema({
    description:{type:String, required: true},
},{collection:'userTypes'})

UserTypeSchema.method('toJSON',function(){
    const {__v,_id, ...object}=this.toObject();
    object.id = _id;
    return object;
})

module.exports= model('UserType',UserTypeSchema);

//COMO CREAR 3 POR DEFECTO UNA VEZ Y QUE QUEDEN??
// O LOS CREO POR BD UNA VEZ Y CHAU??