import routes from '@/routes'
import { defineStore } from 'pinia'

export const useRoutes = defineStore('routes', {
  state: () => ({
    routes
  }),
  getters: {
    getRoute: (state) => (slug: string) => {
      return state.routes[slug]
    },
    getRoutes: (state) => () => {
      return state.routes
    }
  }
})
