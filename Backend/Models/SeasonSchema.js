const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeasonSchema = new Schema({
	country_name: {
		type: String,
		required: true,
	},
	country_quota: {
		type: Number,
		required: true,
	},
	country_season: {
		type: Number,
		required: true,
	},
});

const Season = mongoose.model('Season', SeasonSchema);
module.exports = Season;