const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {Tution} = require('../models/tution');
const {User, validateUser} = require('../models/user');

// const Fwan = require('fawn');

// Fwan.init(require('mongoose'));

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
    const {error} = validateUser(req.body);
    if(error)return res.status(404).send(error);

    // const tut = new Tution({
    //     course:req.body.course
    // })

    let user = new User({
        name:req.body.name,
        phone:req.body.phone,
        isStudent:req.body.isStudent,
        email:req.body.email,
        password:req.body.password,
        username:req.body.username,
        // dateJoined:req.body.dateJoined,
        course_off:new Tution({
            course:req.body.course
        }),
        location:req.body.location,
    });
    user = await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(user,['name','email','id']));

});

// router.put('/:id', async (req,res)=>{
//     const {error} = validateUser(req.body);
//     if(error)return res.status(404).send('Invalid customer');

//     const user = await User.findByIdAndUpdate(req.params.id,{
//         name:req.body.name,
//         isStudent:req.body.isStudent,
//         phone:req.body.phone,
//         username:req.body.username,
//         email:req.body.email,
//         password:req.body.password,
//         // course_off:new Tution({course:req.body.course})
//     }, {new:true});

//     if(!user)return res.status(404).send("something went wrong");
//     res.send(user);
// });

router.delete('/:id', async (req,res)=>{
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.send(user);
});


module.exports = router;