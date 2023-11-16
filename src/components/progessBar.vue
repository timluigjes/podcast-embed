<script setup>
import { ref } from 'vue'
import { usePodcastStore } from '../stores/podcast'
import { storeToRefs } from 'pinia'
const store = usePodcastStore()
const { progress } = storeToRefs(store)
const time = ref('')

setInterval(function () {
  if (store.episode.sound === null) {
    time.value = '0:00'
  }
  time.value = formatTime(store.episode.sound.seek())
}, 1000)

function formatTime(seek) {
  const minutes = Math.floor(seek / 60)
  const seconds = Math.floor(seek % 60)

  let digitMinutes = 1
  if (seek > 600) {
    digitMinutes = 2
  }

  const formattedMinutes = String(minutes).padStart(digitMinutes, '0')
  const formattedSeconds = String(seconds).padStart(2, '0')

  return formattedMinutes + ':' + formattedSeconds
}
</script>

<template>
  <div class="progress-bar">
    <progress class="uk-progress" max="100" :value="progress"></progress>
    <div class="uk-badge" :style="'left: ' + progress + '%'">
      <span class="uk-tooltip uk-active uk-transform-origin-bottom-center">{{ time }}</span>
    </div>
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

  & span {
    display: block;
    padding: 10px 10px;
    width: auto;
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: fit-content;
    max-width: unset;
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
