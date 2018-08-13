import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Main from './Main.vue';
import Chatty from './Chatty.vue';
import GamePicker from './GamePicker.vue';


Vue.use(BootstrapVue);
Vue.use(VueRouter);

var appDiv = document.createElement('div');
appDiv.setAttribute("id", "app");
document.body.appendChild(appDiv);

var routes = [
    { path: '/', component: Main },
    { path: '/chat', component: Chatty },
    { path: '/games', component: GamePicker }
];

var router = new VueRouter({
    routes
});


var app = new Vue({
    router
}).$mount('#app');