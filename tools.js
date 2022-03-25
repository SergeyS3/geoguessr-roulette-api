const mongoose = require('mongoose')
const keys = require('./data/keys')

const connectDB = async () => {
	if(mongoose.connection.readyState)
		return
	
	await mongoose.connect(keys.mongo_url)
	mongoose.set('toJSON', {
		virtuals: true,
		transform: (doc, converted) => {
			delete converted._id
		}
	})
}

const btoa = str => Buffer.from(str, 'base64').toString()

module.exports = { connectDB, btoa }
