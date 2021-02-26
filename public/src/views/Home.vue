<template>
  <div class="home">
    <h1>Welcome Gifator</h1>
    <div class="content">
      <p>It is a chat app allows to you chat with your friends only using GIFs.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
};
</script>

<style lang="scss" scoped>
$maincolor: #7d5fff;
.home {
  max- h1 {
    color: $maincolor;
  }
  .content {
    p {
      font-size: 25px;
      font-weight: bold;
    }
  }
  .form-container {
    button {
      padding: 20px;
      display: block;
      width: 100%;
      background-color: $maincolor;
      color: #fff;
      font-weight: bold;
      font-size: 25px;
      & + button {
        margin-top: 25px;
      }
    }
  }
}
</style>
