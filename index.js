const express = require('express');
const app = express();

app.use('/', (request, response) =>{
    return response.end('<h1>HI</h1>');
});

app.listen(8000, (error) =>{
    if(error) console.error('Error in Starting Express Server', error)
    console.log("Success in Starting Express Server");
})