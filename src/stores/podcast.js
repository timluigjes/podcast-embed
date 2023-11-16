import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { Howl } from 'howler'

export const usePodcastStore = defineStore('podcast', () => {
  const url = document.querySelector('#app').dataset.url
  const list = ref([])
  const progress = ref(0)
  const episode = reactive({
    sound: null,
    title: '',
    isPlaying: false,
    image: null,
    url: ''
  })

  async function prepareList() {
    const resp = await fetch(url)
    const body = await resp.text()
    const data = new DOMParser().parseFromString(body, 'text/xml')

    const items = data.querySelectorAll('item')
    if (items.length === 0) {
      throw new Error('No episodes are published')
    }

    let arr = []
    items.forEach((item) => {
      let obj = {
        title: item.querySelector('title').innerHTML.replace('<![CDATA[', '').replace(']]>', ''),
        description: item
          .querySelector('description')
          .innerHTML.replace('<![CDATA[', '')
          .replace(']]>', ''),
        pubDate: item.querySelector('pubDate').innerHTML,
        url: item.querySelector('enclosure').getAttribute('url'),
        image: item.getElementsByTagName('itunes:image')[0].getAttribute('href')
      }
      arr.push(obj)
    })

    list.value = arr
  }

  function getList() {
    if (list.value.length === 0) {
      prepareList()
    }
  }

  function step() {
    let seek = episode.sound.seek() || 0
    progress.value = (seek / episode.sound.duration()) * 100 || 0
    if (episode.isPlaying) {
      requestAnimationFrame(step)
    }
  }

  function playEpisode(objEpisode) {
    if (episode.sound !== null) {
      episode.sound.unload()
    }

    const sound = new Howl({
      src: objEpisode.url,
      autoplay: true,
      html5: true,
      onplay: function () {
        episode.isPlaying = true
        requestAnimationFrame(step)
      },
      onpause: function () {
        episode.isPlaying = false
      },
      onend: function () {
        episode.isPlaying = false
      },
      onstop: function () {
        episode.isPlaying = false
      }
    })

    episode.title = objEpisode.title
    episode.image = objEpisode.image
    episode.sound = sound
    episode.url = objEpisode.url
  }

  function getActiveEpisode() {
    return episode
  }

  function pause() {
    episode.sound.pause()
    episode.isPlaying = false
  }

  function play() {
    episode.sound.play()
    episode.isPlaying = true
  }

  return { getList, list, playEpisode, episode, pause, play, getActiveEpisode, progress }
})
