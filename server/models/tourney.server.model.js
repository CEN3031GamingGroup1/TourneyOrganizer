/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var tourneySchema = new Schema({
  tournamentName: {
    type: String, 
    required: true
	unique: true
  }, 
  game: {
    type: String, 
    required: true, 
    unique: true
  }, 
  address:  {
    type: String, 
    required: true
  }, 
  tournamentDate: {
    day: Number, 
    month: Number,
	year: Number
  },
   fee: {
	 type: boolean
	 required: false
  },
    ageReq: {
     type: boolean
	 required: false
  },
  created_at: Date,
  updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
tourneySchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
//var Listing = mongoose.model('Listing', tourneySchema);

/* Export the model to make it avaiable to other parts of your Node application */
//module.exports = Listing;
