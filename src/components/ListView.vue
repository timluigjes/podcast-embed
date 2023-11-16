<script setup>
import { usePodcastStore } from '../stores/podcast'
const podcastStore = usePodcastStore()
podcastStore.getList()
const activeEpisode = podcastStore.getActiveEpisode()

function playEpisode(episode) {
  if (activeEpisode.url === episode.url) {
    if (activeEpisode.isPlaying) {
      return podcastStore.pause()
    } else {
      return podcastStore.play()
    }
  }
  if (episode.title.length === 0) {
    throw new Error('No episode is set?')
  }
  podcastStore.playEpisode(episode)
}
</script>
<template>
  <ul class="uk-list uk-list-striped">
    <li v-for="(episode, index) in podcastStore.list" :key="index">
      <div class="info">
        <img :src="episode.image" width="50" alt="" /><span>{{ episode.title }}</span>
      </div>
      <button class="uk-margin-left" @click="playEpisode(episode)" aria-label="Play episode">
        <font-awesome-icon
          icon="fa-solid fa-pause"
          v-show="activeEpisode.title === episode.title && activeEpisode.isPlaying"
        />
        <font-awesome-icon
          icon="fa-solid fa-play"
          v-show="!activeEpisode.isPlaying || episode.title !== activeEpisode.title"
        />
      </button>
    </li>
  </ul>
</template>

<style scoped>
li {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
}

.info {
  display: flex;
  align-items: center;
  gap: 20px;
}

button {
  border: 1px solid #e5e5e5;
  border-radius: 50%;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
}
</style>
