<script setup>
import { usePodcastStore } from '../stores/podcast'
import progessBar from './progessBar.vue'
const podcastStore = usePodcastStore()
const episode = podcastStore.episode

function play() {
  if (episode.isPlaying) {
    podcastStore.pause()
  } else {
    podcastStore.play()
  }
}
</script>
<template>
  <div class="navbar" v-if="episode.title.length > 0">
    <progessBar />
    <div class="navbar-content">
      <div class="info">
        <img :src="episode.image" width="75" alt="" />
        <span class="title">{{ episode.title }}</span>
      </div>
      <div class="controls">
        <button @click="play">
          <font-awesome-icon icon="fa-solid fa-pause" v-show="episode.isPlaying" />
          <font-awesome-icon icon="fa-solid fa-play" v-show="!episode.isPlaying" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  box-shadow: 0px 0px 7px 1px rgba(0, 0, 0, 0.1);
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
}

.navbar-content {
  display: flex;
  padding: 10px;
  background-color: #f8f8f8;
  border-block: 1px solid #e5e5e5;
  gap: 20px;
  justify-content: space-between;
}

.controls {
  display: flex;
  align-items: center;

  & button {
    border: 1px solid #e5e5e5;
    border-radius: 50%;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
  }
}

.info {
  display: flex;
  gap: 20px;
  align-items: center;

  & .title {
    font-size: 1.2rem;
  }
}
</style>
