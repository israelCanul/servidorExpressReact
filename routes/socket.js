var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next,io) {
  // conexion de los clientes hacia el socket
	io.on('connection',function(socket){
	  console.log("New user connected");
	  contBooks.findAllMessages(io);
	  // funcion que se encarga de compartir la informacion
	  // los clientes
	  socket.on('chat message', function(msg) {
	    contBooks.addMessages(msg);
	    contBooks.findAllMessages(io);      
	      //console.log("mensaje entrante : "+msg);
	    });
	  // mostramos en consola cuando un cliente 
	    // se desconecta
	    socket.on('disconnect',function(){
	      console.log("User disconnected");
	    })

	});
});

module.exports = router;