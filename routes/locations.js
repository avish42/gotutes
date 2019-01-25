const express = require('express');
const router = express.Router();
const {Location,validateLocation} = require('../models/location');

router.post('/',async (req,res)=>{
    const {error} = validateLocation(req.body);
    if(error)return res.status(404).send(error);

    let loc = new Location({
        lat:req.body.lat,
        long:req.body.long
    });

    loc = await loc.save();
    res.send(loc);

});

module.exports = router;