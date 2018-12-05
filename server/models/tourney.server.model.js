/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/* Create your schema */
var tourneySchema = new Schema({
	tournamentName: {
		type: String,
		required: true,
		unique: true
	}, //ADD HOST after authentication
	host: {
		type: String,
		unique: false
	},
	game: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	tournamentDate: {
		type: Date,
		required: true
	},
	details: {
		type: String,
		required: false
	},
	fee: {
		type: Number,
		required: false
	},
	ageReq: {
		type: Number,
		required: false
	},
	featured: {
		type: Number,
		required: true
	},
	created_at: Date,
	updated_at: Date
});

tourneySchema.pre('save', function (next) {
	var currentTime = new Date;
	this.updated_at = currentTime;
	if (!this.created_at) {
		this.created_at = currentTime;
	}
	next();
});

var Tourney = mongoose.model('Tourney', tourneySchema);

module.exports = Tourney;
