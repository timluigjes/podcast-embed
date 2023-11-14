import './assets/main.css'
import UIkit from 'uikit'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())

library.add(faPause, faPlay)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
