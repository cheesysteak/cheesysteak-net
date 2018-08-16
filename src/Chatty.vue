<template>
    <div id="chatty">
        <div class="chatty-header">
            #chat
        </div>
        <div class="messages">
            <div v-for="(msg, idx) in messages" :key="idx" class="message">
                <div class="messageContainer">
                    <div class="user">
                        {{msg.user}}
                    </div>
                    <div class="messageContent">
                        {{msg.message}}
                    </div>
                </div>
            </div>
        </div>
        <div>
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
    #chatty {
        position: relative;
        height:100%;
        width:100%;
    }


    #chatbox { 
        position: absolute;
        bottom: 0;
        width:100%;
        display:grid;
        grid-template-columns: repeat(12, 1fr);
        input {
            border: 0; 
            padding: 10px;
            grid-column: span 11;
        }

        button {
            grid-column: span 1;
        }
    }

    .message {
        display:block;
        width:100%;
    }

    .messageContainer {
        display:grid;
        grid-template-columns: repeat(12, 1fr);
    }

    .user {
        grid-column:span 2;
    }

    .messageContent {
        grid-column:span 2;
    }
</style>