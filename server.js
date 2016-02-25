var express        = require('express'),
	logger         = require('morgan');
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose       = require('mongoose'),
    passport       = require('passport'),
    session        = require('express-session'),
    port           = 3000 || process.env.PORT,
    app            = express();

var cookieParser = require('cookie-parser');


var LocalStrategy   = require('passport-local').Strategy;


var bcrypt = require('bcrypt-nodejs');

require('./config/passport')(passport);


mongoose.connect('mongodb://localhost/project2');

var entriesController = require('./controllers/entriesController.js');
var usersController     = require('./controllers/usersController.js');



// ====================================
			// MIDDLEWARE
// ====================================

app.use(logger('dev'));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


app.use(session({ secret: 'shiggidy' })); // session secret
app.use(passport.initialize());
app.use(passport.session());



app.use('/entries', entriesController);
app.use('/users', usersController);












// landing page with user authentication
app.get('/', function(req, res) {

	res.render('users/landing.ejs');

});












app.listen(port, function() {
    console.log('=======================');
    console.log('Running on port ' + port);
    console.log('=======================');
});






















