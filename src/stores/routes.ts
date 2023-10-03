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
    },
    search: (state) => (term: string) => {
      const query = new RegExp(term, 'gi')

      if (term.replace(/\s/g, '') === '') {
        return state.routes
      }

      return Object.keys(state.routes)
        .filter((e) => {
          const route = state.routes[e]

          return route.name.match(query)
        })
        .reduce((a, b) => ({ ...a, [b]: state.routes[b] }), {})
    }
  }
})
