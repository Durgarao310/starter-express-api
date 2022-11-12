'use strict'
const Mongoose = require('mongoose')

const messageSchema = new Mongoose.Schema({
	m: {
		type: String,
		required: true
	},
	t: {
		type: String
	},
	u: {
		type: Number
	}
})

const Message = Mongoose.model('Message', messageSchema)
module.exports = Message
