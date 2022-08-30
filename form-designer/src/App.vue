<template>
  <div class="main-container">
    <nav>
      <!--<router-link to="/about">About</router-link> | -->
      <router-link to="/form">Form Designer</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,
body,
#app {
  height: 100%;
  width: 100%;
}
.main-container {
  width: 100%;
  height: 100%;
  min-width: 1260px;
  /* background-color: #42b983; */
}
nav {
  padding: 20px;
  background-color: #25623f;
}

nav a {
  font-weight: bold;
  color: #25623f;
}

nav a.router-link-exact-active {
  color: #fff;
}
</style>
