import { defineStore } from 'pinia'

export type Status = 'success' | 'info' | 'warning' | 'error' | 'help'

interface SnackbarStore {
  visible: boolean
  message: string
  status: Status
}

export const useSnackbar = defineStore('snackbar', {
  state: (): SnackbarStore => ({
    visible: false,
    message: '',
    status: 'info'
  }),
  actions: {
    show(message: string, status: Status) {
      this.visible = true
      this.message = message
      this.status = status
    },
    hide() {
      this.visible = false
    }
  }
})
