var socket = io();
socket.on('connect', function()  {
    console.log('connected to server');

    
}); 

socket.on('disconnect', function()  {
    console.log('disconnected from server');
}); 

socket.on('newMessage', function(msg){
    console.log(msg); 


    var li = $('<li></li>');
    li.text(`${msg.from} : ${msg.text}`);


    $('#messages').append(li);


});



socket.on('newUser', function(msg){
    console.log(msg);
});


$('#message').on('submit', function(e) {
    e.preventDefault();
    var text = $('[name=msg]').val();
    socket.emit('createMessage', {
        from: 'me',
        text: text
    }, function(){
        
    });
});