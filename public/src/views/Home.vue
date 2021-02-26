<template>
  <div class="home">
    <h1>Welcome to home page of Gifator</h1>
    <div class="form-container">
      <button
        @click="
          () => {
            this.$router.push('/login');
          }
        "
      >
        Login
      </button>
      <button
        @click="
          () => {
            this.$router.push('/register');
          }
        "
      >
        Register
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
};
</script>

<style scoped scss>
.home {
}
</style>
