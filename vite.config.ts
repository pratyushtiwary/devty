import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { VitePWA } from 'vite-plugin-pwa'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import topLevelAwait from 'vite-plugin-top-level-await'
import moduleListGenerator from './moduleListGenerator'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    moduleListGenerator(),
    nodePolyfills({
      include: ['path', 'fs']
    }),
    viteStaticCopy({
      targets: [
        {
          // required for curl convertor module
          src: 'node_modules/web-tree-sitter/tree-sitter.wasm',
          dest: ''
        },
        {
          // required for curl convertor module
          src: 'node_modules/curlconverter/dist/tree-sitter-bash.wasm',
          dest: ''
        }
      ]
    }),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: '__devty',
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__devty_${i}`
    }),
    vue(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      workbox: {
        sourcemap: true,
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,png,svg,ts,vue,woff2,json,ico,wasm}']
      },
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Devty',
        short_name: 'Devty',
        description: 'Your go to place for developers tools and utilities',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        icons: [
          {
            src: 'logo.png',
            sizes: '187x187',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      'balm-ui-plus': 'balm-ui/dist/balm-ui-plus.esm.js',
      'balm-ui-css': 'balm-ui/dist/balm-ui.css',
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
