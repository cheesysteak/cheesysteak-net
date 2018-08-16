var logger = require('./Logger');

var guid = () => {
    var S4 = () => {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
    }
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
};

var games = [];

var setup = {
    setupOnitama: (socket, io) => {
        socket.on('game list', (callback) => {    
            logger.logSocketAction(socket, `requesting games`);

            callback(games);
        });

        socket.on('game create', (gameName) => {
            var game = {
                id: guid(),
                name: gameName,
                players: []
            };
            
            games.push(game);

            logger.logSocketAction(socket, `create game. id: ${game.id}. name: ${game.name}.`)

            io.emit('game list updated', games);
        });

        socket.on('game join', (id) => {
            logger.logSocketAction(`join game. id: ${id}`)

            var game = games.filter(g => g.id === id)[0];
            
            var alreadyInGame = game.players.filter(p => p === socket.id).length;

            if(!alreadyInGame) {
                game.players.push(socket.id);
                io.emit('game list updated', games);
            }
        });

        socket.on('disconnect', () => {
            var inGames = games.filter(g => g.players.filter(p => p === socket.id).length);

            for(var idx = 0; idx < inGames.length; idx++) {
                inGames[idx].players = inGames[idx].players.filter(p => p !== socket.id);

                logger.logSocketAction(socket, `removed from game ${inGames[idx].id}`);
            }
    
            io.emit('game list updated', games);
        });
    }
};

module.exports = setup;