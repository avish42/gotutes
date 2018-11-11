const express = require('express');
const router = express.Router();
const {Tution} = require('../models/tution');
const {User, validateUser} = require('../models/user');

// router.get('/',async (req,res)=>{
//     const users = await User.find();
//     res.send(tutions);
//     console.log('OK');

// });

router.post('/:id',async (req,res)=>{
    const user = await User.findById(req.params.id);
    if(user.isStudent)return res.status(404).send('cant push tutions to student');
    const tution = new Tution({course:req.body.course});
    user.course_off.push(tution);
    user.save();
    res.send(user);
});

router.delete('/:id',async (req,res)=>{
    const user = await User.findById(req.params.id);
    const tution = user.course_off.id(req.body.id);
    tution.remove();
    user.save();
    res.send(user);
});



module.exports = router;