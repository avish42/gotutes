const auth = require('./routes/auth');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./routes/users');
const tutions = require('./routes/tutions');
const locations = require('./routes/locations');
var path = require('path');
const config = require('config');

if(!config.get('jwtprivkey')){
    console.log('FATAL ERROR: jwtprivkey is not defined');
    process.exit(1); 
}

//connecting to mongoDB
mongoose.connect('mongodb://localhost:27017/gotutes', {useNewUrlParser:true})
 .then(()=>console.log("Connected to DB..."))
 .catch(err=>console.log(err.message));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/tutions', tutions);
app.use('/api/locations',locations);
app.use('/api/auth',auth);

app.get('/',async (req,res)=>{
    res.sendFile(path.join(__dirname, 'home.html'));
    console.log("enter the get at /");
});
app.get('/front-end.js', async(req,res)=>{
    res.sendFile(path.join(__dirname, 'front-end.js'));
})


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));