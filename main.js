/* eslint-disable no-console */
/* eslint-disable no-undef */
const { app, BrowserWindow, session, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
const autoUpdater = require('electron-updater')

const createWindow = () => {
  const win = new BrowserWindow({
    icon: './public/logo.png',
    frame: false,
    width: 850,
    height: 600,
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
        'Content-Security-Policy': ["default-src 'self'"]
      }
    })
  })

  win.removeMenu()
  win.loadFile('dist/index.html')
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

app.on('ready', () => {
  autoUpdater.checkForUpdatesAndNotify()
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