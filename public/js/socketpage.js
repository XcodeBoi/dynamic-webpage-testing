const socket = io();
let username = "boo"

document.querySelector('#btn').addEventListener('click', e => {
	console.log(username)
	socket.emit('change_username', {username: username})
})