var express = require('express'),
    router  = express.Router();

var Entry = require('../models/entries');   

var User = require('../models/users');


// 				===========
//   			   INDEX
// 				===========

	
router.get('/', isLoggedIn, function(req, res) {

	Entry.find(function(err, entries){

		res.render('entries/index.ejs', {

		entries: entries
	
	});

	});

});



// router.get('/json', function(req, res) {
	
// 	Entry.find(function(err, entry) {

// 		res.send(entry)
	
// 	});
// });



// middleware to check login status
// used in index route
function isLoggedIn(req, res, next) {
  console.log('isLoggedIn middleware');
  if (req.isAuthenticated()) {
    return next(); 
  } else {
    res.redirect('/users');
  }
}




module.exports = router;






