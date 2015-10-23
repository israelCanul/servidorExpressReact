exports = module.exports = function(app, mongoose) {

	var msj = new mongoose.Schema({
	    author    : String
	  , time     : String
	  , message : String
	});
	mongoose.model('Message',msj);

	var author = new mongoose.Schema({
	    author    : String
	  , color     : String
	});

	mongoose.model('Author',author);
	
};

