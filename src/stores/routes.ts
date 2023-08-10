import { defineStore } from 'pinia'

export interface Route {
  name: string
  dir: string
  icon?: string
  image?: string
  visible?: boolean
}

export interface Routes {
  [slug: string]: Route
}

const routes: Routes = {
  hash_generator: {
    name: 'Hash Generator',
    dir: 'HashGenerator',
    icon: 'tag'
  },
  base64_image: {
    name: 'Base 64 Image Convertor',
    dir: 'Base64Image',
    icon: 'image'
  },
  base64_text: {
    name: 'Base 64 Text Convertor',
    dir: 'Base64Text',
    icon: 'title'
  },
  time_convertor: {
    name: 'Time Convertor',
    dir: 'TimeConvertor',
    icon: 'today'
  },
  color_picker: {
    name: 'Color Picker',
    dir: 'ColorPicker',
    icon: 'colorize'
  },
  json_formatter: {
    name: 'JSON Formatter',
    dir: 'JsonFormatter',
    icon: 'data_object'
  },
  jwt_debugger: {
    name: 'JWT Debugger',
    dir: 'JwtDebugger',
    image: 'jwt_icon.svg'
  }
}

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
