exports = module.exports = function(app, mongoose) {

	var author = new mongoose.Schema({
	    author    : String
	  , color     : String
	});

	mongoose.model('Author',author);

};