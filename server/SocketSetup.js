var logger = require('./Logger');

var setup = {
    initializeSocket: (socket, io) => {
        
        logger.log(`new connection established: ${socket.id}`);

        socket.on('disconnect', () => {
            logger.log(`${socket.id} => connection terminated`);
        });
    }
};

module.exports = setup;