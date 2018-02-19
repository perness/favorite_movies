const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	userName: {
		type: String,
		minLength: 3,
		maxLength: 20,
		unique: true,
		required: [true, "No user name has been set!"],
	},
	password: {
		type: String,
		minLength: 4,
		maxLength: 30,
		required: [true, "No password has been set!"],
	},
});

module.exports = mongoose.model("UserSchema", userSchema);
