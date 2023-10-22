import useStorage from '@/hooks/useStorage'
import routes from '@/routes'
import { type Route, type Routes } from '@/types/route'
import { defineStore } from 'pinia'

const storage = useStorage()

export const useRoutes = defineStore('routes', {
  state: () => ({
    routes
  }),
  getters: {
    isDeleted:
      () =>
      (slug: string): boolean => {
        const deleted_routes: string[] = storage.load('deletedModules') || []
        return deleted_routes.includes(slug)
      },
    getRoute(state) {
      return (slug: string): Route | undefined =>
        this.isDeleted(slug) ? undefined : state.routes[slug]
    },
    getRoutes(state) {
      return (): Routes =>
        Object.keys(state.routes)
          .filter((e: string) => !this.isDeleted(e))
          .reduce((a, b) => ({ ...a, [b]: routes[b] }), {})
    },
    search() {
      const self = this
      return (term: string) => {
        const query = new RegExp(term, 'gi')
        const routes = self.getRoutes()

        if (term.replace(/\s/g, '') === '') {
          return routes
        }

        return Object.keys(routes)
          .filter((e: string) => {
            const route = routes[e]

            return route.name.match(query)
          })
          .reduce((a, b) => ({ ...a, [b]: routes[b] }), {})
      }
    }
  }
})
