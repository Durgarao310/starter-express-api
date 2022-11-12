const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const mongoose = require('mongoose')

mongoose.connect(
	'mongodb+srv://telugudjango:19VKErB2MJFomKhB@cluster0.jdyj4yf.mongodb.net/chat?retryWrites=true&w=majority'
)

mongoose.connection.on('error', (err) => {})

mongoose.connection.on('connected', (err, res) => {})

app.get('/', (req, res) => {
	res.send('<h1>Hello world</h1>')
})

io.on('connection', (socket) => {
	socket.on('chat message', (msg, callback) => {
		io.emit('chat message', msg)
		return callback({
			response: { message: msg }
		})
	})
})

server.listen(3000, () => {
	console.log('listening on *:3000')
})
