<template>
    <div>
        <ul id="messages">
            <li v-for="(msg, index) in messages" :key="index">
                {{ msg }}
            </li>
        </ul>
        <form @submit.prevent="sendMessage">
            <input v-model="message" autocomplete="off" /><button type="submit">Send</button>
        </form>
    </div>
</template>

<script>
import io from 'socket.io-client';

export default {
    name: 'Chatty',
    data() {
        return {
            messages: [],
            socket: io(),
            message: '',
            user: ''
        }
    },
    methods: {
        sendMessage (e) {
            e.preventDefault();
            
            this.socket.emit('chat message', this.message);
            this.message = '';
        }
    },
    mounted () {
        this.socket.on('chat message', (msg) => {
            this.messages.push(msg);
        });
    }
}

</script>

<style lang="css" scoped>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font: 13px Helvetica, Arial; }
    form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
    form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
    form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
    #messages { list-style-type: none; margin: 0; padding: 0; }
    #messages li { padding: 5px 10px; }
    #messages li:nth-child(odd) { background: #eee; }
</style>