var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var logger = require('./server/Logger');
var socketSetup = require('./server/SocketSetup.js');



var port = 3000;

var currentUserId = 1;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/web/index.html');
});

app.get('/main.js', function(req, res) {
    res.sendFile(__dirname + '/web/main.js');
});

io.on('connection', function(socket) {
    socket.currentUserId = currentUserId++;

    console.log(socketSetup);

    socketSetup.initializeSocket(socket, io);

});

http.listen(port, function() {
    logger.log(`listening on *:${port}.`);
});