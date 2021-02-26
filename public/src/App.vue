<template>
  <div id="app">
    <div id="nav">
      <div class="logo">
        <h1>gifator</h1>
      </div>
      <div class="urls">
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
        <a class="logout" @click="logout">Logout</a>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  data: () => ({
    isKeyExists: false,
  }),
  mounted() {
    this.isLoggedIn();
  },
  methods: {
    logout: function() {
      localStorage.clear();
      this.$router.push('/');
    },
    isLoggedIn: async () => {
      const API_URL = 'http://localhost:8065/auth/';
      const result = await axios.get(API_URL, {
        headers: {
          Authorization: 'Bearer ' + localStorage.gft_access_token,
        },
      });
      if (result.data.user) {
        this.isKeyExists = true;
      } else {
        this.isKeyExists = false;
      }
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  background: #161616;
}
#nav h1 {
  color: #fff;
}
#nav a {
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  cursor: pointer;
}
#nav a + a {
  margin-left: 30px;
}
#nav a.logout {
  padding: 10px 20px;
  border-radius: 10px;
  display: inline-block;
  background-color: #e84118;
  color: #fff;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
