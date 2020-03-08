import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '@/views/Dashboard.vue';
import Controllers from '@/views/Controllers.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
        },
        {
            path: '/controllers',
            name: 'controllers',
            component: Controllers,
        },
        {
            path: '*',
            redirect: 'dashboard',
        },
    ],
});
