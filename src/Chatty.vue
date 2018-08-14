<template>
    <div id="chatty">
        <div class="row messages">
            <div v-for="(msg, idx) in messages" :key="idx" class="message">
                <div class="user">
                    {{msg.user}}
                </div>
                <div class="messageContent">
                    {{msg.message}}
                </div>
            </div>
            <table class="table">
                <thead><th></th><th></th></thead>
                <tbody>
                    <tr v-for="(msg, idx) in messages" :key="idx">
                        <td>{{msg.user}}</td>
                        <td>{{msg.message}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="row">
            <form id="chatbox" @submit.prevent="sendMessage">
                <input ref="message" v-model="message" autocomplete="off" placeholder="Type a message" />
                <button class="btn btn-primary" type="submit">Send</button>
            </form>
        </div>
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
            
            this.socket.emit('chat message', {
                message: this.message,
                user: this.user,
                });
            this.message = '';

            this.$refs.message.$el.focus();
        },
        getname() {
            this.user = 'user';
        }
    },
    mounted () {
        this.getname();

        this.socket.on('chat message', (msg) => {
            this.messages.push(msg);
        });
    }
}

</script>

<style lang="scss" scoped>

    #chatbox { 
        position: absolute; 
        bottom: 0; 
        left: 0;
        
        input {
            border: 0; 
            padding: 10px;
            width:150px;
            display:inline-block;
        }

        button {
            width: 100px;
            display:inline-block;
        }
    }

    #messages { 
        .messageContainer {
            display:grid;
            grid-template-columns: repeat(12, 1fr);

            .user {
                grid-column:span 3;
            }

            .messageContent {
                grid-column:span 9;
            }
        }

    }
</style>