import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Friends from '../views/Friends.vue';
import Register from '../views/Register.vue';
import store from '../store/store'

Vue.use(VueRouter);

function sendDashboardIfAutenticated(to, from, next) {
  if (store.state.isUserLoggedIn) {
    next('/friends');
  } else {
    next();
  }
}

function sendLoginIfNotAuthenticated(to, from, next) {
  if (!store.state.isUserLoggedIn) {
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
    meta: {
      title: 'Login',
    },
  },
  {
    path: '/friends',
    name: 'friends',
    component: Friends,
    beforeEnter: sendLoginIfNotAuthenticated,
    meta: {
      title: 'Friends',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register',
    },
  },
];

function checkLogin() {
  fetch('http://localhost:8065/auth', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('gft_access_token'),
    },
  }).then(res => res.json()).then(res => {
    if(res.user){
      return store.commit('toggleLogin', { value: true })
    }
    store.commit('toggleLogin', { value: false })
  })
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
const DEFAULT_TITLE = 'Gifator';
router.afterEach(to => {
  Vue.nextTick(() => {
    document.title = to.meta.title
      ? `${to.meta.title} | ${DEFAULT_TITLE}`
      : DEFAULT_TITLE;
  });
});

router.beforeEach(checkLogin())

export default router;
