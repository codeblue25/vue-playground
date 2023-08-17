<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <VisionPractice />
  </div>
</template>

<script>
import VisionPractice from './components/VisionPractice.vue';
export default {
  name: 'App',
  components: {
    VisionPractice
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
