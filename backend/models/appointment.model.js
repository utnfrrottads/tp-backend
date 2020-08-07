const mongoose = require('mongoose');
const { response } = require('express');

const {Schema , model} = mongoose;


const AppointmentSchema = new Schema({
    date:{type:Date, required: true},
    state:{type:String, required: true,default:'Reserved'},
    createdDate:{type:Date},
    user:{type:Schema.Types.ObjectId,ref:'User',required:true},
    field:{type:Schema.Types.ObjectId,ref:'Field',required:true},
},{collection:'appoinments'})

AppointmentSchema.index({ date: 1, field: 1 }, { unique: true})

AppointmentSchema.method('toJSON',function(){
    const {__v,_id, ...object}=this.toObject();
    object.id = _id;
    return object;
})

module.exports= model('Appointment',AppointmentSchema);
