<script setup>
import NavBar from './components/NavBar.vue'
// import Visualizer from './components/Visualizer.vue';
import ListView from './components/ListView.vue'
</script>

<template>
  <ListView></ListView>
  <NavBar></NavBar>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100dvh;
  overflow-x: hidden;
}
</style>
