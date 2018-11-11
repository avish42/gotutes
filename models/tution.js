
const mongoose = require('mongoose');
const Joi = require('joi');
const tutionSchema = new mongoose.Schema({
    course:{
        type:String
    }
})

const Tution = mongoose.model('tution',tutionSchema);

function validateTution(tution){
    const schema = {
       name:Joi.string().min(1).max(50).required()
    };

    return Joi.validate(tution,schema);
}

exports.tutionSchema = tutionSchema;
exports.Tution = Tution;
exports.validateTution = validateTution;