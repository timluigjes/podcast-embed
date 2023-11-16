<script setup>
import { usePodcastStore } from '../stores/podcast'
import { storeToRefs } from 'pinia'
const store = usePodcastStore()
const { progress } = storeToRefs(store)
console.log(progress)
</script>

<template>
  <div class="progress-bar">
    <progress class="uk-progress" max="100" :value="progress"></progress>
    <div class="uk-badge" :style="'left: ' + progress + '%'"></div>
  </div>
</template>

<style scoped>
.progress-bar {
  width: 100%;
  height: 10px;

  & progress {
    margin-bottom: 0;
    border-radius: unset;
    height: 10px;
  }

  & div {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: relative;
    left: 0;
    bottom: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
}
</style>
