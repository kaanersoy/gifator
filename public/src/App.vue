<template>
  <div id="app">
    <div id="nav">
      <div class="logo">
        <h1>gifator</h1>
      </div>
      <div class="urls">
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a + a {
  margin-left: 30px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
