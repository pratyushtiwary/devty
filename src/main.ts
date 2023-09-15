import 'balm-ui-css'
import './assets/main.css'

import hljsVuePlugin from '@highlightjs/vue-plugin'
import BalmUI from 'balm-ui' // Official Google Material Components
import hljs from 'highlight.js/lib/common'
import json from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/atom-one-dark.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// this is require or else new instance of hljs will be registered by hljsVuePlugin
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
