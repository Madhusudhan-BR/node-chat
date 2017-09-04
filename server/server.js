const path = require('path'); 
const express = require('express');
const socketio = require('socket.io');
const http = require('http');

var app = express(); 
var server = http.createServer(app);
var io = socketio(server);
var public = path.join(__dirname, "/../public");
var port = process.env.PORT || 3000;


console.log('public', public);
app.use("/", express.static(public));



io.on('connection', (socket) => {
    console.log(' client connected to server');

    socket.on('disconnect', () => {
        console.log('disconnected from server');
    }); 

    socket.on('createMessage', function(message) {
        console.log(message);
    });

    socket.emit('newMessage', {
        from: 'comp',
        text: 'from comp',
        created: '123'
    });

});

server.listen(port,()=> {
    console.log('server started on port ' + port);
})