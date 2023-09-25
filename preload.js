/* eslint-disable no-undef */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('IS_ELECTRON', true)
contextBridge.exposeInMainWorld('titleBarActions', {
  minimize: () => {
    ipcRenderer.invoke('minimize')
  },
  maximize: () => {
    ipcRenderer.invoke('maximize')
  },
  close: () => {
    ipcRenderer.invoke('close')
  }
})
