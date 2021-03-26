const socket = io();
let username = document.querySelector("#field")
let messageField = document.querySelector("#message")
let usernameChk = false
let messageChk = false
let usernameCache = "anon"

document.querySelector('#btn').addEventListener('click', e => {
	if(username.value == "") {
		if(usernameChk == false) {
			invalidTxt = document.createElement("p")
			invalidTxt.appendChild(document.createTextNode("Invalid!"))
			invalidTxt.setAttribute("id", "invalidTxt")
			document.getElementById("invalid").appendChild(invalidTxt);
		}
		usernameChk = true
	}
	else {
		if(username.value != usernameCache) { // prevents redundant server requests
			socket.emit('change_username', {username: username.value})
			usernameChk = false
			usernameCache = username.value
			try { // so no error in console when it doesnt exist
				let sepcial = document.getElementById("invalidTxt")
				sepcial.parentNode.removeChild(sepcial);
			}
			catch {
				// placeholder
			}
		}
		username.value = ""
	}
})
document.querySelector('#btnMessage').addEventListener('click', e => {
	if(messageField == "") {
		if(messageChk == false) {
			invalidTxt = document.createElement("p")
			invalidTxt.appendChild(document.createTextNode("Invalid!"))
			invalidTxt.setAttribute("id", "invalidTxtM")
			document.getElementById("invalidM").appendChild(invalidTxt);
		}
		messageChk = true
	}
	else {
		socket.emit('send_message', {message: messageField.value})
		messageChk = false
		try {
			let sepcial = document.getElementById("invalidTxtM")
			sepcial.parentNode.removeChild(sepcial);
		}
		catch {
			// placeholder
		}
	}
})

var elem = document.getElementById('chat');
elem.scrollTop = elem.scrollHeight;


socket.on('receive_message', data => {
    console.log(data)
    textmessage = document.createElement("li")
    username = document.createElement("b")
    username.appendChild(document.createTextNode(data.username + ": "))
    textmessage.appendChild(username);
    textmessage.appendChild(document.createTextNode(data.message))
    document.getElementById("chat").appendChild(textmessage);
})