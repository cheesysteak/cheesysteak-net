var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var logger = require('./Logger');

var chattyServer = require('./ChattyServer.js');
var onitamaSever = require('./OnitamaServer');
var socketSetup = require('./SocketSetup');

var rootDir = './dist';

var port = 3000;


app.get('/', function(req, res) {
    res.sendFile('index.html', { root: rootDir });
});

app.get('/main.js', function(req, res) {
    res.sendFile('main.js', { root: rootDir });
});

io.on('connection', function(socket) {
    console.log(socketSetup);

    socketSetup.initializeSocket(socket, io);
    chattyServer.setupChatty(socket, io);
    onitamaSever.setupOnitama(socket, io);

});

http.listen(port, function() {
    logger.log(`listening on *:${port}.`);
});