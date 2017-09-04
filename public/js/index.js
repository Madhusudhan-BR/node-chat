var socket = io();
socket.on('connect', function()  {
    console.log('connected to server');

    socket.emit('createMessage',{
        from: 'brmadhusudhan',
        text: 'heloooooo'
    });
}); 

socket.on('disconnect', function()  {
    console.log('disconnected from server');
}); 

socket.on('newMessage', function(msg){
    console.log(msg);
})