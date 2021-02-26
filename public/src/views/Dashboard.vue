<template>
  <section>
    <h3 v-if="user">Welcome, {{ user.username }}!</h3>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Dashboard',
  data: () => ({
    user: null,
  }),
  mounted() {
    const API_URL = 'http://localhost:8065/auth/';
    axios
      .get(API_URL, {
        headers: {
          Authorization: 'Bearer ' + localStorage.gft_access_token,
        },
      })
      .then(res => (this.user = res.data.user));
  },
};
</script>

<style></style>
