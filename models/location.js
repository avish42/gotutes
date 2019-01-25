const mongoose = require('mongoose');
const Joi = require('joi');

const locationSchema = new mongoose.Schema({
    lat:{
        type:Number
    },
    long:{
        type:Number
    }    
})

const Location = mongoose.model('location',locationSchema);

function validateLocation(location){
    const schema = {
       lat:Joi.number().required(),
       long:Joi.number().required()
    };

    return Joi.validate(location,schema);
}


exports.locationSchema = locationSchema;
exports.Location = Location;
exports.validateLocation = validateLocation;