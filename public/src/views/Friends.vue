<template>
  <section>
    <h3 v-if="user">Welcome, {{ user.username }}!</h3>
    <div class="form-container">
      <div v-if="responseMessage" class="res-alert" :class="isError ? 'error' : null">
        <p>{{ responseMessage }}</p>
      </div>
      <form @submit.prevent="addFriend">
        <input v-model="requestEmail" type="text" />
        <button>Add Friend</button>
      </form>
      <div v-if="userFriends" class="friends">
        <div class="friend__head">
          <h4>Waiting Requests</h4>
        </div>
        <div
          v-for="(friend, index) in sendedFriendRequests"
          :key="index"
          class="friends__row"
        >
          {{ 'Username : \n' + friend.name }} ->
          {{ friend.isAccepted ? '✔' : '❌' }}
        </div>
        <div class="friend__head">
          <h4>Recieved Friend Requests</h4>
        </div>
        <div v-if="recievedFriendRequests" class="recieved-friend-request">
          <div
            v-for="(friend, index) in recievedFriendRequests"
            :key="index"
            class="friends__row"
          >
            <p>
              {{ friend.username }}
            </p>
            <div class="button-container">
              <button><span class="material-icons">done</span></button>
              <button><span class="material-icons">clear</span></button>
            </div>
          </div>
        </div>
      </div>
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
    requestEmail: '',
    responseMessage: '',
    isError: false,
    userFriends: [],
    sendedFriendRequests: [],
    recievedFriendRequests: [],
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
    this.getMyFriends();
    this.getSendedRequests();
    this.getRecievedRequests();
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
      this.responseMessage = '';
      this.isError = false;
      const sendbody = {
        toos: this.requestEmail,
      };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.gft_access_token}`,
        },
        body: JSON.stringify(sendbody),
      };
      fetch('http://localhost:8065/api/friends/add', options)
        .then(res => res.json())
        .then(res => {
          this.isError = false;
          if (res.error) {
            this.isError = true;
            return (this.responseMessage = res.error);
          }
          this.responseMessage = res.message;
          this.getSendedRequests();
        });
    },
    async getMyFriends() {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.gft_access_token}`,
        },
      };
      fetch('http://localhost:8065/api/friends/me', options)
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            return console.log(res);
          }
          this.userFriends = res;
        });
    },
    async getSendedRequests() {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.gft_access_token}`,
        },
      };
      fetch('http://localhost:8065/api/friends/sended', options)
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            return console.log(res);
          }
          this.sendedFriendRequests = res;
          console.log(this.sendedFriendRequests);
        });
    },
    async getRecievedRequests() {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.gft_access_token}`,
        },
      };
      fetch('http://localhost:8065/api/friends/recieved', options)
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            return console.log(res);
          }
          this.recievedFriendRequests = res;
          console.log(res);
        });
    },
  },
};
</script>

<style lang="scss">
.res-alert {
  padding: 20px 10px;
  background-color: #686de0;
  &.error {
    background-color: #ff7979;
  }
  p {
  }
}
</style>
