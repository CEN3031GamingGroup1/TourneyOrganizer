/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
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
		day: Number,
		month: Number,
		year: Number
	},
	following: {
		type: [String],
		default: undefined
	},
	created_at: Date,
	updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
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
module.exports = mongoose.model('User', userSchema);;
