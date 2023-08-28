import { BrowserWindow as bw, ipcMain } from 'electron'
import { connectSocket } from '/src-electron/api/server'

ipcMain.on('onRequest', async (e, args) => {
  switch (args.command) {
    case 'connect':
      try {
        connectSocket()
      } catch (error) {
        console.error('connect', error)
      }
      break
    default:
      console.log(`unknown request command ${args}`)
  }
})
