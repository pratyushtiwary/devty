/* eslint-disable no-console */
import fs from 'fs'
import path from 'path'
import { type Routes } from './src/types/route'

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

    if (!fs.existsSync(moduleConfigPath)) {
      console.warn(`Skipping ${modules[i]} module, no config file found`)
      continue
    }

    if (!fs.existsSync(path.join(modulePath, modules[i] + '.vue'))) {
      console.warn(`Skipping ${modules[i]} module, no ${modules[i]}.vue file found`)
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
