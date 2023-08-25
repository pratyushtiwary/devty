import HomeView from '@/views/HomeView.vue'
import ModuleView from '@/views/ModuleView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
