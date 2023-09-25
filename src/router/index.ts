import HomeView from '@/views/HomeView.vue'
import ModuleView from '@/views/ModuleView.vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

// eslint-disable-next-line no-console
const router = createRouter({
  // @ts-ignore
  history: window.IS_ELECTRON
    ? createWebHashHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:slug',
      name: 'module',
      component: ModuleView
    }
  ]
})

export default router
