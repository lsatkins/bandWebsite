const express = require('express');
let app = express();
const io = require('socket.io')();
let PORT = 3000;

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(require('./routes/index'));
app.use(require('./routes/albums'));
app.use(require('./routes/album'));
app.use(require('./routes/contactUs'));
app.use(require('./routes/chat'));

const server = app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})

io.attach(server);

io.on('connection', (socket) =>{

    socket.emit('chatMessage', {msg: "Hello from our backend server"})

    socket.on('postMessage', (data)=>{
        io.emit('updateMessages', data)
    })

    socket.on('disconnect', (user)=>{
        io.emit('User has left the room')
    })
})