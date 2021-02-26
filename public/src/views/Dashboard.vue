<template>
  <section>
    <h3>U logged in before so you can't log in again!</h3>
    <h1>This is the dashboard Section</h1>
    <p>Your token is: {{ token }}</p>
  </section>
</template>

<script>
export default {
  name: 'Dashboard',
  data: () => ({
    token: localStorage.getItem('gft_access_token'),
  }),
};
</script>

<style></style>
