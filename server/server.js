const path = require('path'); 
const express = require('express');
const socketio = require('socket.io');
const http = require('http');

var {generateMessage} = require('./utils/message.js');

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

    socket.emit('newUser', generateMessage('admin', 'welcome to chat app'));

    socket.broadcast.emit('newUser', generateMessage('admin', 'new user joined app'));

    socket.on('createMessage', function(message, callback) {
        console.log(message); 

        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            created: new Date().getTime
        }); 

        callback('received message');

    });

    

});

server.listen(port,()=> {
    console.log('server started on port ' + port);
})