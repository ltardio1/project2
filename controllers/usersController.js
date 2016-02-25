var express = require('express'),
    router  = express.Router();

var passport = require('passport');

// var passportLocal = require('passport-local').Strategy;

var LocalStrategy   = require('passport-local').Strategy;

var Entry = require('../models/entries');   

var User = require('../models/users');




// router.get('/users/landing', function(req, res) {

// 	res.render('u')

// });



//          ===========
//             INDEX
//          ===========

router.get('/', function(req, res) {

  res.locals.login = req.isAuthenticated();

  User.find(function(err, users){

    res.render('users/index.ejs', {

     users: users 

  });

  });

});




// logout of session
router.get('/logout', function(req, res) {

    req.logout();

    res.redirect('/users');

});



// show page -- can only be viewed if logged in
router.get('/:id', isLoggedIn, function(req, res) {
		
		// for user control flow within template (enables editing only on the user's own page)
		req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;
		
		// res.locals.usertrue = (req.user.id == req.params.id);

		User.findById(req.params.id, function(err, user) {
			
			res.render('users/show.ejs', 

				{ 
					
					user: user

				});
		});
});








// NEW

router.get('/:id/new', function(req, res) {

		// req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;

		User.findById(req.params.id, function(err, user) {		
			console.log("USER >>>" + user.username);
	// no loop or data needed because new.ejs will 
	// just have forms that will handle the necessary information
	res.render('users/new.ejs', {user: user});
	

	});
});





// saving a new entry to the Entry model and the User's entries list
router.post('/:id/newentry', function(req, res) {

	// req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;

	User.findById(req.params.id, function(err, user) {
		
		var entry = new Entry(req.body);
		
		entry.save(function(err, entry) {
			
			user.entries.push(entry);

			console.log("==============");
			console.log("SAVING!!!!!!!!");
			console.log("==============");
			
			user.save(function(err, user) {
			
				res.redirect('/users/' + user.id);
			
			});			
		});
	});
});





        
             // ==========
                // EDIT
             // ==========

// when edit button is clicked 
router.get('/:id/:entryid/edit', function(req, res){

		// console.log(req.params);
		// console.log(user);

	// mongoose helper function is being used to get the data from the particular
	// entry that the user intended on editing when he clicked on the edit button 
    Entry.findById(req.params.entryid, function(err, entry){

    	// console.log(entry);
    		// the second parameter corresponds with the function above
    		// and contains the info that the user asked to edit 
    		res.render('users/edit.ejs', {entry: entry, user: req.params.id});
    });

});



 // 			===========
 //   				PUT
 // 			===========

// needs to match edit form action
router.put('/:id/:entryid/edit', function(req, res){
	console.log("==========");
	console.log("OBJECT: " + req.params.id);
	console.log("OBJECT: " + req.params.entryid);
	console.log("==========");

    User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
   

    	for (var i = 0; i< user.entries.length; i++) {

    			// printing out the id of the specific entry that the user wishes to edit
    			console.log("================");
				console.log(user.entries[i].id);
				console.log("================");

    		if (user.entries[i].id == req.params.entryid) {

    			// pre-existing text for the post that I want to access
	    		console.log("==================");
				console.log(user.entries[i].body);
				console.log("==================");
				
				// new text that user types in
				console.log("===========");
				console.log(req.body.body);
				console.log("===========");

				// replacing the old with the new
				user.entries[i].body = req.body.body;


//		{		// failed attempt at the solution 
//		{		// user.entries[i] = req.body;

//								----------
//		{		 I tried to use this helper function and query because 
//		{		 even though I already accessed the user model with 'User.findByIdAndUpdate',
//		{		 I thought I still needed to use the '$set'  query  
//		{									
//   	{		 User.update({ _id: req.params.entryid }, {$set : {'entries.$.body': req.body.body}});
//								----------

//		{  		// saving req.body.body (the new text) 
//		{ 		// that should replace user.entries[i].body (the old text)
				user.save(function(err) {
    				
    				res.redirect('/users/' + req.params.id);

    			});
    			// end save function
			}
    		}
    	});
		});

    	// User.save(function(err, user) {
    	
	    // console.log("==========");
		// console.log(user.entries);
		// console.log("==========");

    	





// sign-up
// users / landing page will contain sign-up form to create user profiles 
// right away / unless they already have an account, in which case
// they will fill out the login form instead, that will communicate with the
// route below this one 
router.post('/', passport.authenticate('local-signup', { 

	failureRedirect: '/users' }), function(req, res) {

    //success redirect goes to show page
    res.redirect('/users/' + req.user.id);
});


// login
router.post('/login', passport.authenticate('local-login', { 

	// successRedirect : '/users/' + req.user.id, // redirect to the secure profile section

	failureRedirect: '/users' }), function(req, res) {

    // success redirect goes to show page
    res.redirect('/users/' + req.user.id);

});






router.delete('/:id', function(req, res) {
	console.log('ACCESSING DELETE ROUTE');
	User.findById(req.params.id, function(err, user) {
		if (user.entries.length == 0) {
			user.remove(function(err) {
				res.redirect('/users');
			});
		} else {
			user.entries.forEach(function(entry) {
				Entry.findOneAndRemove({ _id: entry.id }, function(err) {
					if (err) console.log(err);
				});
			});
			user.remove(function(err) {
				res.redirect('/users');
			});
		}
	});
});




// middleware to check login status
// used in show route
function isLoggedIn(req, res, next) {
	console.log('isLoggedIn middleware');
  if (req.isAuthenticated()) {
  	return next(); 
  } else {
  	res.redirect('/users');
  }
}








module.exports = router;










