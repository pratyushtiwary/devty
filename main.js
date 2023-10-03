/* eslint-disable no-console */
/* eslint-disable no-undef */
const { app, BrowserWindow, session, ipcMain } = require('electron')
const url = require('url')
const isDev = require('electron-is-dev')
const path = require('path')

// use this to redirect a request path to a url
const REDIRECTIONS = {
  // request path: resource path
  'tree-sitter-bash.wasm': getURL('dist/tree-sitter-bash.wasm') // a dependency for curlConverter module is using absolute path for this
}

function getURL(loc) {
  // give it a relative path and it'll create file:/// url from it
  return url.format({
    pathname: path.join(__dirname, loc),
    protocol: 'file:',
    slashes: true
  })
}

const createWindow = () => {
  const win = new BrowserWindow({
    show: false,
    icon: './dist/logo.png',
    frame: false,
    minHeight: 600,
    minWidth: 850,
    webPreferences: {
      allowRunningInsecureContent: true,
      preload: path.join(__dirname, 'preload.js'),
      devTools: isDev
    }
  })

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ["default-src 'self' 'unsafe-eval' data: blob:"]
      }
    })
  })

  session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
    const filename = details.url.split('/').pop()
    const isAbs =
      details.url.replace(
        'file:///' + path.parse(details.url.slice('file:///'.length)).root,
        ''
      ) === filename

    if (Object.keys(REDIRECTIONS).includes(filename) && isAbs) {
      callback({
        redirectURL: REDIRECTIONS[filename]
      })
      return
    }
    callback({})
  })

  win.removeMenu()
  win.loadURL(getURL('dist/index.html'))
  win.maximize()
  win.show()
  if (isDev) {
    win.openDevTools()
  }
}

app.whenReady().then(() => {
  if (isDev) {
    console.log(`You are running the electron app on dev.`)
    console.log(`Live changes is not handled`)
    console.log(`Each change requires new build`)
    console.log(`Use npm run dev command and once you are happy with the result`)
    console.log(`then build and then run this command again`)
  }
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('minimize', () => {
  BrowserWindow.getFocusedWindow().minimize()
})

ipcMain.handle('maximize', () => {
  BrowserWindow.getFocusedWindow().maximize()
})

ipcMain.handle('close', () => {
  BrowserWindow.getFocusedWindow().close()
})
