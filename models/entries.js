var mongoose = require('mongoose');




var entrySchema = mongoose.Schema({
	
	body: {type: String, required: true}


});




var Entry = mongoose.model('Entry', entrySchema);


module.exports = Entry;