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

	//body parsing middleware
	app.use(bodyParser.json());


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

	app.get('/home', function (req, res) {
		res.sendFile(path.join(__dirname + '../../../client/index.html'));
	});


	app.get('/profile', isLoggedIn, function (req, res) {
		res.sendFile(path.join(__dirname + '../../../client/profileView.html'));
	});




	//Auth routes
	app.get('/signup', function (req, res) {
		res.sendFile(path.join(__dirname + '../../../client/signup.html'));
	});

	app.post('/signup', function (req, res) {
		User.register(new User({ username: req.body.username, email: req.body.email, dob: { day: req.body.day, month: req.body.month, year: req.body.year }, following: [] }),
			req.body.password, function (err, user) {
				if (err) {
					console.log(err);
					return res.redirect('/signup');
				}
				passport.authenticate('local')(req, res, function () {
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
		failureFlash: 'Incorrect Username or Password'
	}), function (req, res) {
		console.log('tried');
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
