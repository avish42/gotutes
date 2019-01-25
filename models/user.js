const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
const {tutionSchema} = require('../models/tution');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:1,
        maxlength:15
    },
    isStudent:{type:Boolean, default:true},
    phone:{type:Number,required:true},
    email:{type: String, required:true, unique:true},
    password:{type: String, required:true},
    username:{type:String, required:true},
    dateJoined:{type:Date,default:Date.now},
    course_off:[tutionSchema],
    location:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Location'
    }
    
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id}, config.get('jwtprivkey'));
    return token;
}
const User = mongoose.model('user',userSchema);

function validateUser(customer){
    const schema = {
        name:Joi.string().min(1).max(15).required(),
        phone:Joi.number().integer().min(9).required(),
        isStudent:Joi.boolean(),
        email:Joi.string().min(1).max(40).required().email(),
        password:Joi.string().min(6).max(15).required(),
        username:Joi.string().min(2).max(15).required(),
        course:Joi.string().min(2).max(50),
        location:Joi.string().required()
    };

    return Joi.validate(customer,schema);
}


exports.User = User;
exports.validateUser = validateUser;