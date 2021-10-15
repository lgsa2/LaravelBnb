require('./bootstrap');

import router from './routes';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Vue from 'vue';
import App from './App.vue';
import StarRating from './Shared/Components/StarRating.vue';
import FatalError from './Shared/Components/FatalError.vue';
import ValidationErrors from './Shared/Components/ValidationErrors.vue';
import Success from './Shared/Components/Success.vue';
import storeDefinition from './store';


window.Vue = require('vue').default;


Vue.use(VueRouter);
Vue.use(Vuex);

Vue.component('star-rating', StarRating);
Vue.component('fatal-error', FatalError);
Vue.component('v-errors', ValidationErrors);
Vue.component('success', Success);


const store = new Vuex.Store(storeDefinition);

const app = new Vue({
    el: '#app',
    router: router,
    store: store,
    components: {
        "app": App
    },
    beforeCreate() {
        this.$store.dispatch('loadStoredState');
    }
});