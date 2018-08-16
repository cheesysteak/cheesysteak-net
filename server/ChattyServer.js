var logger = require('./Logger');

var setup = {
    setupChatty: (socket, io) => {
        socket.on('chat message', (msg) => {    
            logger.logSocketAction(socket, `${msg.user} sent message: ${msg.message}.`);

            io.emit('chat message', msg);
        });
    }
};

module.exports = setup;