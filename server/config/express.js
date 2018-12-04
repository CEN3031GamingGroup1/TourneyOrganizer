var path = require('path'),
	express = require('express'),
	mongoose = require('mongoose'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	config = require('./config'),
	tourneyRouter = require('../routes/tourney.server.routes.js'),
	userRouter = require('../routes/user.server.routes.js'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
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
	app.use(bodyParser.urlencoded({ extended: true }));

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
	app.get('/home', function (req, res) {
		res.sendFile(path.join(__dirname + '../../../client/index.html'));
	});

	app.get('/map', function (req, res) {
		res.sendFile(path.join(__dirname + '../../../client/findTournaments.html'));
	});


	app.get('/create', function (req, res) {
		res.sendFile(path.join(__dirname + '../../../client/createTourney.html'));
	});


	app.get('/admin', isAdmin, function (req, res) {
		res.sendFile(path.join(__dirname + '../../../client/AdminPage.html'));
	});


	app.get('/profile', isLoggedIn, function (req, res) {
		res.sendFile(path.join(__dirname + '../../../client/profileView.html'));
	});


	app.get('/getUsername', isLoggedIn, function (req, res) {
		res.send({username: req.user.username});
		res.end();
	});


	//Auth routes
	app.get('/signup', function (req, res) {
		res.sendFile(path.join(__dirname + '../../../client/signup.html'));
	});


	app.post('/signup', function(req, res) {
		User.register(new User({username: req.body.username, email: req.body.email, dob: req.body.dob, tourneys: []}),
		req.body.password, function(err, user) {
			if(err) {
				console.log(err);
				return res.redirect('/signup');
			}
				passport.authenticate('local')(req, res, function() {
					res.redirect('/home');
				});
			});
	});

	app.get('/login', function (req, res) {
		res.sendFile(path.join(__dirname + '../../../client/login.html'));
	});

	app.get('/loginSuccess', function(req, res) {
		res.send(req.user.username);
	});

	app.get('/loginFailure', function(req, res) {
		res.send(undefined);
	});

	app.post('/login', passport.authenticate('local', {
		successRedirect: '/loginSuccess',
		failureRedirect: '/loginFailure'
	}), function(req, res) {
		if(req.isAuthenticated()) {
			res.send(req.user.username);
		}
		else {
			res.send(undefined);
		}
	});


	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/home');
	});

	app.get('/admin', isAdmin, function (req, res) {
		res.sendFile(path.join(__dirname + '../../../client/AdminPage.html'));
	});


//auth functions
	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/login');
	}

	function isAdmin(req, res, next) {
		if (req.isAuthenticated() && req.user.admin) {
			return next();
		}
		res.redirect('/home');
	}

	/**TODO
	// Go to homepage for all routes not specified */
	app.get('*', function (req, res) {
		res.redirect('/home');
	});



	return app;
};
