var mongoose = require('mongoose'),
	Tourney = require('../models/tourney.server.model.js');

/*
In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
On an error you should send a 404 status code, as well as the error message.
On success (aka no error), you should send the listing(s) as JSON in the response.
*/

/* Create a tournament */
exports.create = function (req, res) {

	/* Instantiate a Listing */
	var tourney = new Tourney(req.body);


	/* Then save the listing */
	tourney.save(function (err) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			res.json(tourney);
		}
	});
};

/* Show the current tourney */
exports.read = function (req, res) {
	/* send back the tourney as json from the request */
	res.json(req.tourney);
};

/* Update a listing */
exports.update = function (req, res) {
	var tourney = req.tourney;

	Tourney.findOneAndUpdate({ tournamentName: req.tourney.tournamentName }, req.body, function (err) {
		if (err)
			res.status(400).send(err);
		else {
			console.log('Updated tourney!')
			Tourney.findOne({ tournamentName: req.body.tournamentName }, function (err, updatedTourney) {
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

/* FOR USE ON ADMIN PAGE */
exports.delete = function (req, res) {
	var tourney = req.tourney;
	Tourney.findOneAndRemove({ tournamentName: req.tourney.tournamentName }, function (err, oldTourney) {
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
exports.changeimage = function (req, res) {
	var tourney = req.tourney;
	/** TODO **/

};

/* UPDATE THIS CODE TO FIND TOURNAMENTS BY NAME*/
exports.list = function (req, res) {
	Tourney.find().sort({ tournamentName: 1 }).exec(function (err, tourneys) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			res.json(tourneys);
		}
	});
};

/* UPDATE THIS CODE TO FIND TOURNAMENTS BY NAME*/
exports.listFeatured = function (req, res) {
	Tourney.find().sort({ tournamentName: 1 }).exec(function (err, tourneys) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			res.json(tourneys);
		}
	});
};

exports.tourneysByID = function (req, res, next, id) {
	Tourney.findById(id).exec(function (err, tourney) {
		if (err) {
			res.status(404).send(err);
		} else {
			req.tourney = tourney;
			next();
		}
	});
};
