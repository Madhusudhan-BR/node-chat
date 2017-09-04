var socket = io();
socket.on('connect', function()  {
    console.log('connected to server');

    
}); 

socket.on('disconnect', function()  {
    console.log('disconnected from server');
}); 

socket.on('newMessage', function(msg){
    
    var formattedTime = moment(msg.created).format('h:mm a');
    var temp = $('#message-template').html();
    var html = Mustache.render(temp, {
        from: msg.from, 
        text: msg.text,
        created: formattedTime
    });
    
    $('#messages').append(html);


});



socket.on('newUser', function(msg){
    console.log(msg);
    var li = $('<li></li>');
    li.text(`${msg.from} : ${msg.text}`);


    $('#messages').append(li);
});


$('#message').on('submit', function(e) {
    e.preventDefault();
    var text = $('[name=msg]').val();
    socket.emit('createMessage', {
        from: 'me',
        text: text
    }, function(){
        $('[name=msg]').val('');
    });
});

socket.on('newLocationMessage', function(msg) {
    // var li = $('<li></li>');
    // var formattedTime = moment(msg.created).format('h:mm a');
    // var a = $('<a target="_blank"> My current location is </a>');
    // li.text(`${msg.from} ${formattedTime}`); 
    // a.attr('href', msg.url);
    // li.append(a); 
    // $('#messages').append(li); 

    var formattedTime = moment(msg.created).format('h:mm a');
    var temp = $('#location-message-template').html();
    var html = Mustache.render(temp, {
        from: msg.from, 
        url: msg.url,
        created: formattedTime
    });
    
    $('#messages').append(html);

});

$('#locButton').click(function(){    
    if(!navigator.geolocation) {
        return alert('geolocation is not supported');
    } else {    
        $('#locButton').attr('disabled','disabled').text('Sending..');
         navigator.geolocation.getCurrentPosition(function(pos){
             socket.emit('createLocationMessage', {
                latitude: pos.coords.latitude,
                 longitude: pos.coords.longitude
             });
             $('#locButton').removeAttr('disabled').text('Send Location');
         },function(err){
            console.log('unable to get location');
            $('#locButton').removeAttr('disabled').text('Send Location');
         });
    }
});