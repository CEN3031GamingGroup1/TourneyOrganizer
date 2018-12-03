/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
tourneySchema = require('mongoose').model('Tourney').schema,
	passportLocalMongoose = require('passport-local-mongoose'),
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
		type: String
	},
	dob: {
		type: Date
	},
	attending: [tourneySchema],
	admin: {
		type: Boolean,
		default: false
	},
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


userSchema.plugin(passportLocalMongoose);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = mongoose.model('User', userSchema);
