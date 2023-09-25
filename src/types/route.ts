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
