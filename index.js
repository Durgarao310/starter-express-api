const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/testdb')
mongoose.connection.on('error', (err) => {
	console.log('err', err)
})

mongoose.connection.on('connected', (err, res) => {
	console.log('mongoose is connected')
})

app.get('/', (req, res) => {
	res.send('<h1>Hello world</h1>')
})

io.on('connection', (socket) => {
	console.log('a user connected')

	socket.on('chat message', (msg) => {
		io.emit('chat message', msg)
	})

	socket.on('disconnect', () => {
		console.log('user disconnected')
	})
})

server.listen(3000, () => {
	console.log('listening on *:3000')
})
