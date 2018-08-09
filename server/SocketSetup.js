var logger = require('./Logger');

var setup = {
    initializeSocket: (socket, io) => {
        
        logger.log(`new connection established: ${socket.currentUserId}`);

        socket.on('disconnect', () => {
            logger.log(`connection terminated (user id ${socket.currentUserId})`);
        });

        socket.on('chat message', (message) => {    
            logger.log(`message: ${message}`);

            io.emit('chat message', message);
        });
    }
};

module.exports = setup;