/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
	tourneySchema = require('mongoose').model('Tourney').schema,
	Schema = mongoose.Schema;

/* Create your schema */
var userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	dob: {
		day: Number,
		month: Number,
		year: Number
	},
	attending: [tourneySchema],
	created_at: Date,
	updated_at: Date
});

userSchema.pre('save', function (next) {
	var currentTime = new Date;
	this.updated_at = currentTime;
	if (!this.created_at) {
		this.created_at = currentTime;
	}
	next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;
