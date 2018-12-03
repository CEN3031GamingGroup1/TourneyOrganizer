var path = require('path'),
	express = require('express'),
	mongoose = require('mongoose'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	config = require('./config'),
	tourneyRouter = require('../routes/tourney.server.routes.js'),
	userRouter = require('../routes/user.server.routes.js'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	passportLocalMongoose = require('passport-local-mongoose'),
	User = require('../models/user.server.model.js');



module.exports.init = function () {
	//connect to database
	mongoose.connect(config.db.uri);

	//initialize app
	var app = express();
	app.use(require('express-session')({
		secret: "this is very secret",
		resave: false,
		saveUninitialized: false
	}));
	app.use(passport.initialize());
	app.use(passport.session());

	passport.use(new LocalStrategy(User.authenticate()));
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());

	//enable request logging for development debugging
	app.use(morgan('dev'));

<<<<<<< HEAD
  //body parsing middleware
  app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
=======
	//body parsing middleware
	app.use(bodyParser.json());

>>>>>>> 2e95d10f390ac096a0f61fe172118bf884130d86

	/**TODO
	Serve static files */
	app.use(express.static('client'));

	/**TODO
	  Use the tourney router for requests to the api */
	app.use('/api/tourneys', tourneyRouter);

	/**TODO
	Use the user router for requests to the api */
	app.use('/api/users', userRouter);

	////////////
	// ROUTES //
	////////////
	app.get('/createTourney', function (req, res) {
		res.sendFile(path.join(__dirname + '../../../client/createTourney.html'));
	});

<<<<<<< HEAD
app.get('/home', function(req, res) {
	console.log(path.join(__dirname+'../../../client/index.html'));
	res.sendFile(path.join(__dirname+'../../../client/index.html'));
});


app.get('/profile', isLoggedIn, function(req, res) {
res.sendFile(path.join(__dirname+'../../../client/profileView.html'), {headers: {username: req.user.username}});
});
=======
	app.get('/home', function (req, res) {
		res.sendFile(path.join(__dirname + '../../../client/index.html'));
	});


	app.get('/profile', isLoggedIn, function (req, res) {
		res.sendFile(path.join(__dirname + '../../../client/profileView.html'));
	});
>>>>>>> 2e95d10f390ac096a0f61fe172118bf884130d86




	//Auth routes
	app.get('/signup', function (req, res) {
		res.sendFile(path.join(__dirname + '../../../client/signup.html'));
	});

<<<<<<< HEAD
	app.post('/signup', function(req, res) {
		User.register(new User({username: req.body.username, email: req.body.email, dob: req.body.username, following: []}),
		req.body.password, function(err, user) {
			if(err) {
				console.log(err);
				return res.redirect('/signup');
			}
				passport.authenticate('local')(req, res, function() {
=======
	app.post('/signup', function (req, res) {
		User.register(new User({ username: req.body.username, email: req.body.email, dob: { day: req.body.day, month: req.body.month, year: req.body.year }, following: [] }),
			req.body.password, function (err, user) {
				if (err) {
					console.log(err);
					return res.redirect('/signup');
				}
				passport.authenticate('local')(req, res, function () {
>>>>>>> 2e95d10f390ac096a0f61fe172118bf884130d86
					res.redirect('/home');
				});
			});
	});

	app.get('/login', function (req, res) {
		res.sendFile(path.join(__dirname + '../../../client/login.html'));
	});

	app.post('/login', passport.authenticate('local', {
		successRedirect: '/home',
		failureRedirect: '/login',
<<<<<<< HEAD
		sucessFlash: 'Welcome!',
		failureFlash: 'Try again'
	}), function(req, res) {
		res.redirect('/home');
=======
		failureFlash: 'Incorrect Username or Password'
	}), function (req, res) {
		console.log('tried');
>>>>>>> 2e95d10f390ac096a0f61fe172118bf884130d86
	});

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/home');
	});

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/login');
	}

	/**TODO
	// Go to homepage for all routes not specified */
	app.get('*', function (req, res) {
		res.redirect('/');
	});



	return app;
};
