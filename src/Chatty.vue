<template>
    <div id="chatty">
        <ul id="messages">
            <li class="messageContainer" v-for="(msg, index) in messages" :key="index">
                <div class="user">{{ msg.user }}</div>
                <div class="messageContent">{{ msg.message }}</div>
            </li>
        </ul>
        <form id="chatbox" @submit.prevent="sendMessage">
            <input ref="message" v-model="message" autocomplete="off" placeholder="Type a message" />
            <button class="btn btn-primary" type="submit">Send</button>
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
        list-style-type: none; 
        margin: 0; 

        li.messageContainer { 
            div {
                display:inline-block;
            }
            div.user {
                width:100px;
            }
            div.messageContent {
                width: 150px;
                word-wrap:break-word;
            }
        }
        li.messageContainer:nth-child(odd) {
            background: #eee;
        }
    }
</style>