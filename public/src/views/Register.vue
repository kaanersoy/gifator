<template>
  <section>
    <h1>Register Page</h1>
    <div class="form-container">
      <div v-if="isCreated" class="response-alert" :class="isErr ? 'error' : 'response'">
        <p>{{ responseMessage }}</p>
        <p v-if="!isErr">You are redirecting...</p>
      </div>
      <form @submit.prevent="register">
        <label for="username">Username</label>
        <input type="text" v-model="user.username" id="username" name="username" />
        <label for="email">E-mail</label>
        <input type="email" v-model="user.email" id="email" name="email" />
        <label for="password">Password</label>
        <input type="password" v-model="user.password" id="password" name="password" />
        <button>Register</button>
      </form>
    </div>
  </section>
</template>

<script>
// import axios from 'axios';
export default {
  name: 'Register',
  data: () => ({
    user: {
      username: '',
      password: '',
      email: '',
    },
    isCreated: '',
    responseMessage: '',
    isErr: false,
  }),
  methods: {
    register: function() {
      const API_URL = 'http://localhost:8065/auth/register';
      const options = {
        method: 'POST',
        body: JSON.stringify(this.user),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      fetch(API_URL, options)
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            this.responseMessage = res.error;
            this.isCreated = true;
            this.isErr = true;
            return;
          }
          this.responseMessage = res.created_user.name + ' is created!';
          this.isCreated = true;
          this.isErr = false;
        })
        .catch(err => console.log(err));
    },
  },
};
</script>

<style lang="scss">
.form-container {
  .response-alert {
    padding: 20px 0;
    background-color: green;
    &.error {
      background-color: red;
    }
    p {
      color: #fff;
    }
  }
}
</style>
