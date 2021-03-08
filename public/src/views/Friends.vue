<template>
  <section>
    <h3 v-if="user">Welcome, {{ user.username }}!</h3>
    <div class="form-container">
      <form @submit.prevent="">
        <input v-model="message" type="text" />
        <button @click="addFriend">Gonder</button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Friends',
  data: () => ({
    user: null,
    message: 'yey',
  }),
  sockets: {
    connect: function() {
      console.log('socket connected');
    },
    customEmit: function(data) {
      console.log('Message Arrived, ', data);
    },
  },
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
  methods: {
    sendSocketConnection() {
      this.$socket.emit('message', this.message);
    },
    async addFriend() {
      const sendbody = {
        toos: `kaanersoy12121@gmail.com`,
      };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.gft_access_token}`,
        },
        body: JSON.stringify(sendbody),
      };
      fetch('http://localhost:8065/friend/add', options).then(res => res.json());
      // .then(res => console.log(res));
    },
  },
};
</script>

<style></style>
