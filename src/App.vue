<template>
  <div id="app">

    <router-view></router-view>
  </div>
</template>

<script>
import InterviewUserLogin from './components/MyLogin.vue'

export default {
  name: 'App',
  components: {
    InterviewUserLogin
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
