const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
	title: {
		type: String,
		required: [true, "No title has been set!"],
	},
	releaseDate: {
		type: Number,
		min: 1900,
		max: 2020,
		required: [true, "No release date has been set!"],
	},
	userName: {
		type: String,
		minLength: 3,
		maxLength: 20,
		required: [true, "Need user name"],
	},
	time: {
		type: Number,
		require: [true, "Need to add ms time"],
	},
	isPublic: {
		type: Boolean,
		default: false,
	},

});

module.exports = mongoose.model("MovieSchema", movieSchema);
