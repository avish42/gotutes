const express = require('express');
const router = express.Router();
// const {Tution} = require('../models/tution');
const {User} = require('../models/user');
const Joi = require('joi');
// const config = require('config');

function validate(req){
    const schema = {
        email:Joi.string().min(1).max(40).required().email(),
        password:Joi.string().min(6).max(15).required(),
    };

    return Joi.validate(req,schema);
}


router.get('/',async (req,res)=>{
    const users = await User.find();
    res.send(users);
    console.log('OK');

});

router.get('/:id', async (req,res)=>{
    const user = await User.findById(req.params.id);
    res.send(user);
});

router.post('/', async (req,res)=>{
    // console.log(req.body);
    const {error} = validate(req.body);
    if(error)return res.status(404).send(error);

    let user = await User.findOne({email:req.body.email});
    if(!user) res.status(400).send('invalid user or pass');
    console.log(user);

    if(user.password != req.body.password) res.status(400).send('invalid username or pass');
    
    const token = user.generateAuthToken();
    res.send(token);
});


router.delete('/:id', async (req,res)=>{
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.send(user);
});


module.exports = router;