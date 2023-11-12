<script setup>
import { usePodcastStore } from '../stores/podcast';
const podcastStore = usePodcastStore();
podcastStore.getList();

function playEpisode(link) {
    if(link.length === 0) {
        throw new Error('No episode is set?');
    }
    podcastStore.playEpisode(link);
}
</script>
<template>
   <ul class="uk-list uk-list-striped">
    <li v-for="(episode,index) in podcastStore.list" :key="index">
        <span>{{ episode.title }}</span>
        <button class="uk-margin-left" @click="playEpisode(episode)" aria-label="Play episode"><span uk-icon="icon: play-circle"></span></button>
    </li>
   </ul>
</template>

<style></style>