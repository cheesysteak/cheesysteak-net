var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var logger = require('./Logger');
var socketSetup = require('./SocketSetup.js');



var port = 3000;

var currentUserId = 1;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    socket.currentUserId = currentUserId++;

    console.log(socketSetup);

    socketSetup.initializeSocket(socket, io);

});

http.listen(port, function() {
    logger.log(`listening on *:${port}.`);
});