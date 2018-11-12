
/* Dependencies */
var mongoose = require('mongoose'),
Tourney = require('../models/tourney.server.model.js');


/*
In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
On an error you should send a 404 status code, as well as the error message.
On success (aka no error), you should send the listing(s) as JSON in the response.

HINT: if you are struggling with implementing these functions, refer back to this tutorial
from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
*/

/* Create a tournament */
exports.create = function(req, res) {

	/* Instantiate a Listing */
	var tourney = new Tourney(req.body);


	/* Then save the listing */
	tourney.save(function(err) {
		if(err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			res.json(tourney);
		}
	});
};

/* Show the current tourney */
exports.read = function(req, res) {
	/* send back the tourney as json from the request */
	res.json(req.tourney);
};

/* Update a listing */
exports.update = function(req, res) {
	var tourney = req.tourney;

	/** TODO **/
	/* Replace the article's properties with the new properties found in req.body */
	/* Save the article */

	Tourney.findOneAndUpdate({ tournamentName: req.tourney.tournamentName }, req.body, function(err) {
		if (err)
		res.status(400).send(err);
		else {
			console.log('Updated tourney!')
			Tourney.findOne({ tournamentName: req.body.tournamentName }, function(err, updatedTourney) {
				if (err)
				res.status(400).send(err);
				else {
					console.log(updatedTourney);
					res.json(updatedTourney);
				}
			});
		}
	});

};

/* Delete a listing */
/* FOR USE ON ADMIN PAGE */
exports.delete = function(req, res) {
	var tourney = req.tourney;
	Tourney.findOneAndRemove({ tournamentName: req.tourney.tournamentName }, function(err, oldTourney) {
		if (err)
		res.status(400).send(err);
		else {
			console.log('Removed tourney!');
			console.log(oldTourney);
			res.status(200).send();
		}
	});
};

/* Update Image for profile pics and tournaments */
exports.changeimage = function(req, res) {
	var tourney = req.tourney;
	/** TODO **/

};

/* Retreive all the directory listings, sorted alphabetically by listing code */
/* UPDATE THIS CODE TO FIND TOURNAMENTS BY NAME*/
exports.list = function(req, res) {
	/** TODO **/
	/* Your code here */
	Tourney.find().sort({ tournamentName: 1 }).exec(function(err, tourneys) {
		if (err){
			console.log(err);
			res.status(404).send(err);
		} else {
			res.json(tourneys);
		}
	});
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
/* UPDATE THIS CODE TO FIND TOURNAMENTS BY NAME*/
exports.listFeatured = function(req, res) {
	/** TODO **/
	/* Your code here */
	Tourney.find().sort({ tournamentName: 1}).exec(function(err, tourneys) {
		if (err){
			console.log(err);
			res.status(404).send(err);
		} else {
				res.json(tourneys);
		}
	});
};

/*
Middleware: find a listing by its ID, then pass it to the next request handler.

Find the listing using a mongoose query,
bind it to the request object as the property 'listing',
then finally call next
*/
exports.tourneysByID = function(req, res, next, id) {
	Tourney.findById(id).exec(function(err, tourney) {
		if(err) {
			res.status(404).send(err);
		} else {
			req.tourney = tourney;
			next();
		}
	});
};
