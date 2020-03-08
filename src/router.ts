import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '@/views/Dashboard.vue';
import Controllers from '@/views/Controllers.vue';
import AddController from '@/views/AddController.vue';

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
            path: '/add-controller',
            name: 'add-controllers',
            component: AddController,
        },
        {
            path: '*',
            redirect: 'dashboard',
        },
    ],
});
