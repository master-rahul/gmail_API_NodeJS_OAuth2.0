require('dotenv').config();
const express = require('express');
const app = express();


app.use('/api', require('./routes'));



app.listen(8000, (error) =>{
    if(error) console.error('Error in Starting Express Server', error)
    console.log("Success in Starting Express Server");
})