import { BrowserWindow as bw, ipcMain } from 'electron'
import { connectSocket } from '/src-electron/api/server'
import { getTTSInfo } from '/src-electron/api/tts'

ipcMain.on('onRequest', async (e, args) => {
  switch (args.command) {
    // case 'connect':
    //   try {
    //     connectSocket()
    //   } catch (error) {
    //     console.error('connect', error)
    //   }
    //   break
    case 'refreshTts':
      getTTSInfo()
      break
    default:
      console.log(`unknown request command ${args}`)
  }
})
