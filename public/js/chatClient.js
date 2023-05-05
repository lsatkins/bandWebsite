let chatUsername = document.querySelector('#chatUsername');
let chatMessage = document.querySelector('#chatMessage');

//connect socket.io
const socket = io('http://localhost:3000');
//emitting a message
socket.on('chatMessage', (msg)=>{
    console.log(msg);
})

let chatForm = document.querySelector('form');

chatForm.addEventListener('submit', e=>{

    e.preventDefault();

    //sending a message out to our node server

    socket.emit('postMessage', {
        username: chatUsername.value,
        message: chatMessage.value
    })

    chatMessage.value = ""

    chatMessage.focus();
})

socket.on('updateMessages', data=>{

    showMessage(data)
})

const showMessage = (data) => {

    let chatDisplay = document.querySelector('.chatDisplay');
    let newMessage = document.createElement('p')

    if(chatUsername.value == data.username){
        newMessage.className = "bg-success userMessages"
    }
    else{
        newMessage.className = 'bg-info text-warning otherMessages'
    }

    newMessage.innerHTML = `<strong>${data.username}</strong>: ${data.message}`

    chatDisplay.insertBefore(newMessage, chatDisplay.firstChild)
}