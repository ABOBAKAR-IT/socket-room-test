const socket = io()

var uname, Room_name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    uname = prompt('Please enter your name: ')
    Room_name = prompt('Please enter your  Room name: ')
} while (!uname && Room_name)
if (uname && Room_name) {
    user = uname;
    socket.emit('register', {Room_name});

}
document.getElementById("user_name").innerHTML = uname;
textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: uname,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 

    socket.emit('private_chat', {
        frm: user,
        to: Room_name,
        message: message
    });
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}


/*Received private messages*/
socket.on('private_chat', function (msg) {
    let data = {}

    data.user = msg.username;
    data.message = msg.message;
    appendMessage(data, 'incoming')
    scrollToBottom()
});


socket.on('chat', function (msg) {
    // let name = prompt("welcome login again")
    let data = {}
    console.log(msg)
    msg.sms.forEach(element => {
       
         if(element.to){
            data.user = uname;
            data.message= element.to
            appendMessage(data, 'outgoing')
        }else{
            data.user = Room_name;
            data.message= element.frm
            appendMessage(data, 'incoming')
         }
    scrollToBottom()
        })
});

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}