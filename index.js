const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./routes/users');
const tutions = require('./routes/tutions');

//connecting to mongoDB
mongoose.connect('mongodb://localhost:27017/gotutes', {useNewUrlParser:true})
 .then(()=>console.log("Connected to DB..."))
 .catch(err=>console.log(err.message));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/tutions', tutions);
// app.use('/api/movies', movies);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));