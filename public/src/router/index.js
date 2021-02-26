import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Register from '../views/Register.vue';

Vue.use(VueRouter);

function sendDashboardIfAutenticated(to, from, next) {
  if (localStorage.getItem('gft_access_token') == null) {
    next();
  } else {
    next('/dashboard');
  }
}

function sendLoginIfNotAuthenticated(to, from, next) {
  if (localStorage.getItem('gft_access_token') == null) {
    next('/login');
  } else {
    next();
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: sendDashboardIfAutenticated,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: sendLoginIfNotAuthenticated,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
