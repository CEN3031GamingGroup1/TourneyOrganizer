
/* Dependencies */
var mongoose = require('mongoose'),
	//var passport = require('passport'),
	User = require('../models/user.server.model.js');


/*
In this file, you should use Mongoose queries in order to retrieve/add/remove/update tourneys.
On an error you should send a 404 status code, as well as the error message.
On success (aka no error), you should send the tourney(s) as JSON in the response.

HINT: if you are struggling with implementing these functions, refer back to this tutorial
from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
*/


/* Create a user */
exports.create = function (req, res) {

	/* Instantiate a Tourney */
	var user = new User(req.body);


	/* Then save the user */
	user.save(function (err) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			res.json(user);
		}
	});
};

/* Show the current tourney */
exports.read = function (req, res) {
	/* send back the user as json from the request */
	res.json(req.user);
};

/* Update a tourney */
exports.update = function (req, res) {
	var user = req.user;

	/** TODO **/
	/* Replace the article's properties with the new properties found in req.body */
	/* Save the article */

	User.findOneAndUpdate({ username: req.body.username }, req.body, function (err) {
		if (err)
			res.status(400).send(err);
		else {
			console.log('Updated tourney!')
			User.findOne({ username: req.body.username }, function (err, updatedUser) {
				if (err)
					res.status(400).send(err);
				else {
					console.log(updatedUser);
					res.json(updatedUser);
				}
			});
		}
	});

};

/* Delete a user */
/* FOR USE ON ADMIN PAGE */
exports.delete = function (req, res) {
	var user = req.user;
	User.findOneAndRemove({ username: req.user.username }, function (err, oldUser) {
		if (err)
			res.status(400).send(err);
		else {
			console.log('Removed user!');
			console.log(oldUser);
			res.status(200).send();
		}
	});
};

/* Login */
// exports.login = function(req, res) {
//
//   passport.authenticate('local', function(err, user, info){
//     var token;
//
//     // If Passport throws/catches an error
//     if (err) {
//       res.status(404).json(err);
//       return;
//     }
//
//     // If a user is found
//     if(user){
//       token = user.generateJwt();
//       res.status(200);
//       res.json({
//         "token" : token
//       });
//     } else {
//       // If user is not found
//       res.status(401).json(info);
//     }
//   })(req, res);
//
// };

/* Update Image for profile pics and tournaments */
exports.changeImage = function (req, res) {
	var tourney = req.tourney;
	/** TODO **/

};

/* Retreive all the directory tourneys, sorted alphabetically by tourney code */
/* UPDATE THIS CODE TO FIND TOURNAMENTS BY NAME*/
exports.list = function (req, res) {
	/** TODO **/
	/* Your code here */
	User.find().sort({ username: 1 }).exec(function (err, users) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			res.json(users);
		}
	});
};

/*
Middleware: find a tourney by its ID, then pass it to the next request handler.

Find the tourney using a mongoose query,
bind it to the request object as the property 'tourney',
then finally call next
*/
exports.usersByID = function (req, res, next, id) {
	User.findById(id).exec(function (err, tourney) {
		if (err) {
			res.status(404).send(err);
		} else {
			req.user = user;
			next();
		}
	});
};
