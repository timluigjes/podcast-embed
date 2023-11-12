<script setup>
import { usePodcastStore } from '../stores/podcast';
const podcastStore = usePodcastStore();
const episode = podcastStore.episode;

</script>
<template>
    <div class="uk-navbar-container" uk-navbar v-if="episode.isPlaying">
        <div class="uk-navbar-center">
            <div class="info">
                <img :src="episode.image" width="10" height="20" alt="">
                <span class="title uk-text-lead">{{ episode.title }}</span>
            </div>
            <ul class="uk-navbar-nav">
                <!-- <li><button aria-label="Previous song" class="uk-button uk-button-default"><span aria-hidden="true" uk-icon="icon: triangle-left"></span></button></li> -->
                <li><button @click="play" aria-label="Play song" class="uk-button uk-button-default">
                        <span v-show="!episode.isPlaying" aria-hidden="true" uk-icon="icon: play"></span>
                        <span v-show="episode.isPlaying" aria-hidden="true" uk-icon="icon: pause"></span>
                    </button></li>
                <!-- <li><button aria-label="Next song" class="uk-button uk-button-default"><span aria-hidden="true" uk-icon="icon: triangle-right"></span></button></li> -->
            </ul>
        </div>
    </div>
</template>

<style>
.info {
    display: flex;
    flex: 1 1 100%;
}
</style>