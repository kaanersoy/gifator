<template>
  <div class="login">
    <h1>Login Page</h1>
    <div class="form-container">
      <form @submit.prevent="getLogin">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" placeholder="username" />
        <label for="password">Password</label>
        <input type="text" id="password" v-model="password" placeholder="password" />
        <button>Submit!</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data: () => {
    return {
      username: 'kaan',
      password: 'password',
    };
  },
  methods: {
    getLogin: function() {
      axios
        .post('http://localhost:8065/auth/login', {
          username: this.username,
          password: this.password,
        })
        .then(res => {
          window.localStorage.setItem('gft_access_token', res.data.accessToken);
        })
        .then(() => {
          this.$router.push('/dashboard');
        });
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
