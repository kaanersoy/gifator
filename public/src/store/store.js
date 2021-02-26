import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isUserLoggedIn: false,
  },
  mutations: {
    toggleLogin(state, { value }) {
      state.isUserLoggedIn = value;
    },
  },
});
