import './assets/main.css'
import 'balm-ui-css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import BalmUI from 'balm-ui' // Official Google Material Components
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/styles/atom-one-dark.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

hljs.registerLanguage('json', json)

app.use(createPinia())
app.use(router)
app.use(BalmUI, {
  $theme: {
    primary: '#ffffff',
    secondary: '#ffffff',
    'on-secondary': '#ffffff',
    'on-surface': '#ffffff',
    surface: '#ffffff'
  }
})
app.use(hljsVuePlugin)

app.mount('#app')
