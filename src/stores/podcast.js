import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { Howl } from 'howler'

export const usePodcastStore = defineStore('podcast', () => {
  const url = 'https://rss.art19.com/wilde-eeuwen'
  const list = ref([])
  const episode = reactive({
    sound: null,
    title: '',
    isPlaying: false
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
    episode.sound = sound
  }

  return { getList, list, playEpisode, episode }
})
