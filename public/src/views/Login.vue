<template>
  <div class="login">
    <h1>Login Page</h1>
    <div class="form-container">
      <form v-if="!loading" @submit.prevent="getLogin">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" placeholder="username" />
        <label for="password">Password</label>
        <input type="text" id="password" v-model="password" placeholder="password" />
        <button>Submit!</button>
      </form>
    </div>
    <div v-if="loading" class="loading">
      <img src="../assets/loading-icon.svg" alt="" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data: () => ({
    loading: false,
    username: '',
    password: '',
  }),
  methods: {
    getLogin: async function() {
      this.loading = true;
      setTimeout(() => {}, 3000);
      const response = await axios.post('http://localhost:8065/auth/login', {
        username: this.username,
        password: this.password,
      });
      this.loading = false;
      window.localStorage.setItem('gft_access_token', response.data.accessToken);
      this.$store.commit('toggleLogin', {
        value: true,
      });
      this.$router.push('/friends');
    },
  },
};
</script>

<style>
.form-container {
  width: 30%;
  margin: 0 auto;
}
input,
label {
  width: 100%;
  display: block;
}
</style>
