<template>
  <div id="app">
    <DraggablePractice />
  </div>
</template>

<script>
import DraggablePractice from './components/DraggablePractice.vue'

export default {
  name: 'App',
  components: {
    DraggablePractice
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
