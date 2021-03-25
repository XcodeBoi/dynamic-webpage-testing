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

io.on('connection', socket => {
    console.log("New user connected")

    socket.username = "what"

    socket.on('change_username', data => {
        socket.username = data.username
        console.log(socket.username + " " + data.username)
    })
})