$(document).ready(function(){	
	var socket=io();

	socket.on('chat message', function (msg) {
		$('#list-msgs').html("");
	var mensages=msg;
		if(mensages.length>0){
			console.log("son mas de 0 : "+ mensages.length);
			mensages.map(function(msj){
				$('#list-msgs').append( $('<li>').text(msj.message) );			
			});
		}	
      
    });


    $('#new-msg').keyup(function (evt) {
      if (evt.keyCode === 13) {
        socket.emit('new message', $('#new-msg').val());
        $('#new-msg').val('');
      }
    });
});    