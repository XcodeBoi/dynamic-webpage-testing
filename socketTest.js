const express = require('express')
const socketio = require('socket.io')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res)=> {
    res.render('sockettest')
})

const server = app.listen(3000, () => {
    console.log("server is running")
})
const io = socketio(server)

io.on("connection", socket => {
    console.log("New user connected")

    socket.username = "anon"

    socket.on("change_username", data => {
        socket.username = data.username
    })

    socket.on("send_message", data => {
    	io.sockets.emit('receive_message', {message: data.message, username: socket.username})
    })
})