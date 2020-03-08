import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VTooltip from 'v-tooltip';
import VueTimeago from 'vue-timeago';

Vue.use(VTooltip);

Vue.use(VueTimeago, {});

Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
