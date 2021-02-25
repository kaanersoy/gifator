<template>
  <div class="login">
    <h1>This is a Login Page!!</h1>
    <form @submit.prevent="getLogin">
      <label for="username">Username</label>
      <input type="text" id="username" v-model="username" placeholder="username" />
      <label for="password">Password</label>
      <input type="text" id="password" v-model="password" placeholder="password" />
      <button>Submit!</button>
    </form>
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
        .post(
          'http://localhost:8065/auth/login',
          {
            username: this.username,
            password: this.password,
          },
          {
            withCredentials: true,
          }
        )
        .then(res => console.log(res));
    },
  },
};
</script>

<style>
.login {
  width: 30%;
  margin: 0 auto;
}
input,
label {
  width: 100%;
  display: block;
}
</style>
