var fs = require('fs');

var logFileName = 'log.txt';

fs.writeFile(logFileName, '', (err) => {
    if(err) { console.log(err); }
});

var logger = {
    log: (message) => {
        console.log(message);

        fs.appendFile(logFileName, (new Date()).toLocaleDateString('en-US') + ': ' + message + '\n', (err) => {
            if(err) {
                console.log(err);
            }
        });
    },
    logSocketAction: function(socket, message) {
        if(!socket || !socket.address) {
            this.log(`(socket unspecified) => ${message}`);
        } else {
            this.log(`${socket.handshake.address} (${socket.id}) => ${message}`);
        }
    }
};

module.exports = logger;