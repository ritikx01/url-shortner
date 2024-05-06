const mongoose = require("mongoose");

const URLschema = new mongoose.Schema(
	{
		redirectURL: {
			type: String,
			required: true,
		},
		shortID: {
			type: String,
			required: true,
		},
		user:{
			type: String,
			required: true
		},
		visitHistory: [{ timestamps: { type: Number } }],
	},
	{
		timestamps: true,
	}
);

const URL = mongoose.model("url", URLschema);

module.exports = URL;
