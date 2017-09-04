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

socket.on('newLocationMessage', function(msg) {
    var li = $('<li></li>');
    var a = $('<a target="_blank"> My current location is </a>');
    li.text(`${msg.from}`); 
    a.attr('href', msg.url);
    li.append(a); 
    $('#messages').append(li);

});

$('#locButton').click(function(){    
    if(!navigator.geolocation) {
        return alert('geolocation is not supported');
    } else {
         navigator.geolocation.getCurrentPosition(function(pos){
             socket.emit('createLocationMessage', {
                latitude: pos.coords.latitude,
                 longitude: pos.coords.longitude
             });
         },function(err){
            console.log('unable to get location');
         });
    }
});