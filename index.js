const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
var io = require('socket.io')(server)

app.get('/app', (req, res) => {
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
server.listen(3000, 'localhost', function () {
	console.log('server live')
})
