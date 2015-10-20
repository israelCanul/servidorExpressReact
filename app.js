var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose= require('mongoose');
var app = express();
var socket_io  = require('socket.io');
var io  = socket_io();
app.io = io;

// rutas 
var routes = require('./routes/index');
var users = require('./routes/users');
var chat = require('./routes/chat');

//conexion con la bd
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('conectado a la BD');
});

// se importan los modelos y los controladores para la bd
var models     = require('./model/message')(app, mongoose);
var contBooks= require('./controller/controllerMessages');
var Message = mongoose.model('Message');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/chat', chat);
app.use('/users', users);

    io.on('connection',function(socket){
    console.log("New user connected");
    contBooks.findAllMessages(io);
    // funcion que se encarga de compartir la informacion
    // los clientes
    socket.on('chat message', function() {
      // obtiene todos los mensajes
      contBooks.findAllMessages(io);      
    });
    socket.on('new message', function(msg) {
      // agrega un nuevo mensaje
      contBooks.addMessages(msg);
      contBooks.findAllMessages(io); 
    }); 
    // mostramos en consola cuando un cliente 
      // se desconecta
      socket.on('disconnect',function(){
        console.log("User disconnected");
      })

  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
