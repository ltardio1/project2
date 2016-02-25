var mongoose = require('mongoose');

var bcrypt = require('bcrypt-nodejs');

var LocalStrategy   = require('passport-local').Strategy;


var entrySchema = require('./entries.js').schema;  


var userSchema = new mongoose.Schema({

  username: { type: String, required: true, unique: true},


  // for passport / user authentication
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, unique: true},

  entries: [entrySchema]

});

	// generating a hash
userSchema.methods.generateHash = function(password){

	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

};


// checking if password is valid
userSchema.methods.validPassword = function(password){

	return bcrypt.compareSync(password, this.password);

};





var User = mongoose.model('User', userSchema);


module.exports = User;
