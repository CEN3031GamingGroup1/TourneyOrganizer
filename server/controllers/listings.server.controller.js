
/* Dependencies */
var mongoose = require('mongoose'),
Listing = require('../models/tourney.server.model.js');


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
	var listing = new Listing(req.body);


	/* Then save the listing */
	listing.save(function(err) {
		if(err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			res.json(listing);
		}
	});
};

/* Create a user */
exports.createU = function(req, res) {

	/* Instantiate a Listing */
	var listing = new Listing(req.body);


	/* Then save the listing */
	listing.save(function(err) {
		if(err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			res.json(listing);
		}
	});
};

/* Show the current listing */
exports.read = function(req, res) {
	/* send back the listing as json from the request */
	res.json(req.listing);
};

/* Update a listing */
exports.update = function(req, res) {
	var listing = req.listing;

	/** TODO **/
	/* Replace the article's properties with the new properties found in req.body */
	/* Save the article */

	Listing.findOneAndUpdate({ tournamentName: req.listing.tournamentName }, req.body, function(err) {
		if (err)
		res.status(400).send(err);
		else {
			console.log('Updated listing!')
			Listing.findOne({tournamentName: req.body.tournamentName}, function(err, updatedListing) {
				if (err)
				res.status(400).send(err);
				else {
					console.log(updatedListing);
					res.json(updatedListing);
				}
			});
		}
	});

};

/* Delete a listing */
/* FOR USE ON ADMIN PAGE */
exports.delete = function(req, res) {
	var listing = req.listing;

	/** TODO **/
	/* Remove the article */
	listing.remove(function(err) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		}else{
			res.json(listing);
		}
	})
};


/* Checks if password and email are same */
/* FOR USE ON REGISTRATION PAGE*/
exports.isSame = function(req, res) {
	var listing = req.listing;

	/** TODO **/
	/* Remove the article */
	listing.remove(function(err) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		}else{
			res.json(listing);
		}
	})
};
/* Listing upcoming event */
exports.upcoming = function(req, res) {
	var listing = req.listing;
	/** TODO **/

};

/* Login */
exports.login = function(req, res) {
	var listing = req.listing;
	/** TODO **/

};
/* Update Image for profile pics and tournaments */
exports.changeimage = function(req, res) {
	var listing = req.listing;
	/** TODO **/
	Listing.find().sort('code').exec(function(err, listings) {
		if (err){
			console.log(err);
			res.status(404).send(err);
		} else {
			res.json(listings);
		}
	});

};

/* Retreive all the directory listings, sorted alphabetically by listing code */
/* UPDATE THIS CODE TO FIND TOURNAMENTS BY NAME*/
exports.list = function(req, res) {
	/** TODO **/
	/* Your code here */
	Listing.find().sort({tournamentDate: 1}).exec(function(err, listings) {
		if (err){
			console.log(err);
			res.status(404).send(err);
		} else {
			res.json(listings);
		}
	});
};

/*
Middleware: find a listing by its ID, then pass it to the next request handler.

Find the listing using a mongoose query,
bind it to the request object as the property 'listing',
then finally call next
*/
exports.listingByID = function(req, res, next, id) {
	Listing.findById(id).exec(function(err, listing) {
		if(err) {
			res.status(404).send(err);
		} else {
			req.listing = listing;
			next();
		}
	});
};
