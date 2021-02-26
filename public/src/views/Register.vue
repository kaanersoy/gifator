<template>
  <section>
    <h1>Register Page</h1>
    <div class="form-container">
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
export default {
  name: 'Register',
  data: () => ({
    user: {
      username: '',
      password: '',
      email: '',
    },
  }),
  methods: {
    register: function() {
      console.log(this.user);
    },
  },
};
</script>

<style></style>
