<template>
    <div id="gamePickerContainer">
        
        <div>
            Open Games: <span>(your id: {{ socket.id }})</span>
        </div>

        <div id="gameList">
            <div class="gameListItem header">
                <div class="gameName">Game Name</div>
                <div class="gamePlayers">Players</div>
                <div class="gameActions"><!-- Actions --></div>
            </div>

            <div v-for="(game, index) in games" :key="index" class="gameListItem">
                <div class="gameName">{{ game.name }}</div>
                <div class="gamePlayers">{{ game.players }}</div>
                <div class="gameActions">
                    <div class="btn btn-success"
                        v-if="!alreadyInGame(game)" 
                        v-on:click="joinGame(game)">
                            Join
                    </div>
                </div>
            </div>
        </div>

        <div class="btn btn-primary" v-on:click="createGame">
            Create Game
        </div>

    </div>
</template>

<script>
import io from 'socket.io-client';
export default {
    name: 'GamePicker',
    data() {
        return {
            socket: io(),
            games: []
        }
    },
    methods: {
        createGame() {
            console.log('create game');
            
            var gameName = prompt('enter game name:');
            
            this.socket.emit('game create', gameName);
        },
        joinGame(game) {
            this.socket.emit('game join', game.id);

            console.log('join game', game.name, game.players, game.id);
        },
        alreadyInGame(game) {
            return this.myGames.filter(g => g.id === game.id).length;
        }
    },
    computed: {
        myGames() {
            return this.games.filter(g => g.players.filter(p => p === this.socket.id).length);
        }
    },
    mounted() {
        this.socket.emit('game list', (gamesList) => {
            this.games = gamesList;
        });

        this.socket.on('game list updated', (gamesList) => {
            this.games = gamesList;
        });

        console.log('gamepicker mounted');  
    },
    beforeDestroy() {
        this.socket.disconnect();
        console.log('gamepicker beforeDestroy');
    }
}

</script>

<style lang="scss">
    #gameList {
        .gameListItem {
            display:grid;
            grid-template-columns: repeat(12, 1fr);

            &.header {
                background-color:aquamarine;
            }

            .gameName {
                grid-column:span 3;
            }
            .gamePlayers {
                grid-column: span 3;
            }
            .gameActions {
                grid-column: span 6;
            }
        }
    }

</style>