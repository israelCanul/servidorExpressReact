var mongoose= require('mongoose');
var Message = mongoose.model('Message');
var Author = mongoose.model('Author');

//GET - Funcion para regresar todos los books de la coleccion
//GET - This function return all books on the colection
exports.findAllMessages = function(io) {
    Message.find(function(err, msj) {
      if(err) res.send(500, err.message);
      //console.log('GET /messages'+msj);    
      var respuesta=null;
      if(msj.length>0){
        msj.map(function(msjs){
          Author.findById(msjs._id,function(err, msja) {
            if(err) res.send(500, err.message);
            
            msjs.conf=msja;
            respuesta[]=msjs;

            console.log("author :"+msja);                
          });
        });
        io.emit('chat message', respuesta);
      }  
       
	  });

    /*Author.find({ _id:  },function(err, msj) {
        if(err) res.send(500, err.message);
        //console.log('GET /messages'+msj);
        
        io.emit('chat message', msj);    
      });*/
};

exports.addMessages = function(msg) {
  console.log(msg);
var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth()+1; //hoy es 0!
var yyyy = hoy.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

hoy = mm+'/'+dd+'/'+yyyy;

	var message = new Message({
      author   : msg.author
      , time     : hoy 
      , message  : msg.mensaje
    });



  message.save(function(err, message) {
      if(err) console.log("Error Guardando : "+message);      
      //res.status(200).jsonp(message);
      var author1 = new Author({
          _id:message._id,
          author   : msg.author
          , color  : msg.conf.color
        });
        
        author1.save(function(err, author1) {
          if(err) console.log("Error Guardando : "+author1);      
          //res.status(200).jsonp(author);
          console.log("Mensaje Guardado : "+author1);
        });
    });
  
};


function addAuthor(author) {
  var author = new Author({

      author   : author.author
      , color  : author.color
    });
    
    author.save(function(err, author) {
      if(err) console.log("Error Guardando : "+author);      
      //res.status(200).jsonp(author);
      console.log("Mensaje Guardado : "+author);
    });
};