var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)

app.use(express.static('client'))


app.get('/hola-mundo', (req, res) => {
    res.status(200).send('Hola mundo desde una ruta')
})

var messages = [{
    id: 1,
    text: 'Bienvenido(a) al chat privado de Socket.io y Nodejs de Carlos Gomes',
    nickname: 'Bot - cjgv1809'
}]

io.on('connection', (socket) => {
    console.log('El nodo con IP: '+socket.handshake.address+ ' se ha conectado...')
    socket.emit('messages', messages)

    socket.on('add-message', (data) =>{
        messages.push(data);

        io.sockets.emit('messages', messages)
    })
})

server.listen(6677, function(){
    console.log('Server on port 6677')
})