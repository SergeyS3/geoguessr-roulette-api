const { Schema, model } = require('mongoose')

const schema = new Schema({
	login: String,
	settings: {
		timer: Number,
		wildcard: Boolean
	},
	actions: {
		streak: Number,
		timerPaused: Boolean,
		timerEndTime: Number,
		timerMsLeft: Number,
		wildcard: Boolean
	},
	players: {
		list: [String],
		skipCurrent: Boolean,
		selected: String
	}
})

module.exports = model('Games', schema)
