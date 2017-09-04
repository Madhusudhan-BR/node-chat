const path = require('path'); 
const express = require('express');

var app = express(); 
var public = path.join(__dirname, "/../public");
var port = process.env.PORT || 3000;


console.log('public', public);
app.use("/", express.static(public));


app.listen(port,()=> {
    console.log('server started on port ' + port);
})