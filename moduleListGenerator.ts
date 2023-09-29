/* eslint-disable no-console */
import fs from 'fs'
import path from 'path'
import { type Routes } from './src/types/route'

const CONFIG_REQUIRED_KEYS = ['slug', 'name', 'icon|image']

/*
  Given a path to a module this function returns whether a module is valid or not,
  along with the reason
*/
function isValidModule(loc: string): [boolean, string | null] {
  /*
    A module is valid if:
    - config.json exists and is a valid json file,
    - config.json contains CONFIG_REQUIRED_KEYS,
    - a .vue file exists with the same name as the dir,
  */
  if (!fs.existsSync(loc)) {
    return [false, "Provided location doesn't exists"]
  }
  const CONFIG_PATH = path.join(loc, 'config.json'),
    VUE_PATH = path.join(loc, loc.split(path.sep).pop() + '.vue')
  let config = null

  if (!fs.existsSync(CONFIG_PATH)) {
    return [false, 'Failed to find config.json file']
  }

  try {
    config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'))
  } catch (_) {
    return [false, 'Failed to parse config.json, is it a valid json file?']
  }

  const CONFIG_KEYS = Object.keys(config)

  for (let i = 0; i < CONFIG_REQUIRED_KEYS.length; i++) {
    const keys = CONFIG_REQUIRED_KEYS[i].split(/\|/g)
    let containsSingleKey = false
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j]
      if (Boolean(key) && CONFIG_KEYS.includes(key)) {
        containsSingleKey = true
        break
      }
    }
    if (!containsSingleKey) {
      return [
        false,
        `config.json doesn't contains ${CONFIG_REQUIRED_KEYS[i].replace('|', ' or ')} key`
      ]
    }
  }

  if (!fs.existsSync(VUE_PATH)) {
    return [false, `Failed to find ${loc.split(path.sep).pop()}.vue file inside the module`]
  }

  return [true, null]
}

function generateRoutes() {
  console.clear()
  console.log('Generating Routes List from Modules...')

  const srcPath = 'src'
  const modulesPath = path.join(srcPath, 'modules')

  if (!fs.existsSync(modulesPath)) {
    throw Error(`Failed to generate routes list, module dir not found under '${modulesPath}'`)
  }

  const modules = fs.readdirSync(modulesPath)

  if (modules.length === 0) {
    console.warn(`No modules found under '${modulesPath}'`)
  }

  console.log(`Found ${modules.length} module(s), generating routes...`)

  const routesList: Routes = {}

  for (let i = 0; i < modules.length; i++) {
    const modulePath = path.join(modulesPath, modules[i]),
      moduleConfigPath = path.join(modulePath, 'config.json')

    const [moduleValid, reason] = isValidModule(modulePath)

    if (!moduleValid) {
      console.log(`Skipping module ${modules[i]}, reason: ${reason}`)
      continue
    }

    try {
      const config = JSON.parse(fs.readFileSync(moduleConfigPath, 'utf-8'))
      const slug = config.slug
      delete config['slug']

      routesList[slug] = {
        dir: modules[i],
        ...config
      }
    } catch (e) {
      console.warn(`Invalid config file for module ${modules[i]}, skipping module`)
    }
  }

  const finalFile = `import { type Routes } from '@/types/route'\nconst routes: Routes = ${JSON.stringify(
    routesList,
    null,
    4
  )};\n\nexport default routes;`

  console.log(`Saving routes list...`)

  fs.writeFileSync(path.join(srcPath, 'routes.ts'), finalFile, 'utf-8')

  console.log('Routes list created and saved successfully!')
}

export default () => ({
  name: 'module-list-generator',
  configResolved() {
    generateRoutes()
  },
  handleHotUpdate(ctx: any) {
    if (ctx.file.split('/').pop() !== 'config.json') return
    generateRoutes()
    ctx.server.restart()
  }
})
