var fs = require('fs');

var logFileName = 'log.txt';

fs.writeFile(logFileName, '', (err) => {
    if(err) { console.log(err); }

    console.log(`${logFileName} created.`);
});

var logger = {
    log: (message) => {
        console.log(message);

        fs.appendFile(logFileName, new Date() + ': ' + message + '\n', (err) => {
            if(err) {
                console.log(err);
            }
        });
    }
};

module.exports = logger;