var User = require('../models/users');
var LocalStrategy   = require('passport-local').Strategy;

module.exports = function(passport) {
	console.log('passport config invoked');

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});


	// passport.use code goes inside this
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
  });

    // =====================
	//       SIGNUP
	// =====================

    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
	passport.use('local-signup', new LocalStrategy({

		// by default, local strategy uses username and password, we will override with email
		usernameField: 'email',
		passwordField: 'password',

        // lets us get everything via req.body 
        // and not having to rely on the 2 parameters (email, password)

		passReqToCallback: true
	}, function(req, email, password, done) {

		console.log('Req.body within local signup: ', req.body);

		// find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
		User.findOne({ 'email': email }, function(err, user) {
			
			// if there are any errors, return the error
			if (err) { 
				return done(err) 
			} 

			// check to see if theres already a user with that email
			if (user) { 

				return done(null, false);

			} else {

				// if there is no user with that email
                // create the user
				var newUser = new User();

				// set the user's local credentials
				newUser.email = email;
				newUser.password = newUser.generateHash(password);
				newUser.username = req.body.username;
				
				// save the user
				newUser.save(function(err) {

					if (err) { 

						console.log(err)

						throw err

					} else {

						return done(null, newUser);
					
					}

				}); // end user save
			
			} // end user check exists
		
		}) // end find user

	} // end localstategy params

	)); // end passport local signup



	// =====================
	//        LOGIN
	// =====================


	 // we are using named strategies since we have one for login and one for signup
     // by default, if there was no name, it would just be called 'local'

	passport.use('local-login', new LocalStrategy({
		
		// by default, local strategy uses username and password, we will override with email
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, done) {


		// find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
		User.findOne({ 'email': email }, function(err, user) {
			
			// if there are any errors, return the error before anything else
			if (err) { return done(err) }

			// if no user is found, return the message	
			if (!user) {
				console.log('NO USER FOUND');
				return done(null, false);
			}

			// if the user is found but the password is wrong
			if (!user.validPassword(password)) {
				return done(null, false);
			}

			// all is well, return successful user
			return done(null, user);
		
		}); // end find user

	} // end localstrategy params

	)); // end passport local login


} // end module








