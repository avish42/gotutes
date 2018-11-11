const mongoose = require('mongoose');
const Joi = require('joi');
const {tutionSchema} = require('../models/tution');

const User = mongoose.model('user',new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:1,
        maxlength:15
    },
    isStudent:{type:Boolean, default:true},
    phone:{type:Number,required:true},
    email:{type: String, required:true},
    password:{type: String, required:true},
    username:{type:String, required:true},
    dateJoined:{type:Date,default:Date.now},
    course_off:[tutionSchema]

}));

function validateUser(customer){
    const schema = {
        name:Joi.string().min(1).max(15).required(),
        phone:Joi.number().integer().min(9).required(),
        isStudent:Joi.boolean(),
        email:Joi.string().min(1).max(40).required(),
        password:Joi.string().min(6).max(15).required(),
        username:Joi.string().min(2).max(15).required()
        // course:Joi.string().min(2).max(50)
    };

    return Joi.validate(customer,schema);
}


exports.User = User;
exports.validateUser = validateUser;