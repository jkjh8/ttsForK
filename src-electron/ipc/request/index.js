import { BrowserWindow as bw, ipcMain, shell } from 'electron'
import { getTTSInfoSync } from '/src-electron/api/tts'

ipcMain.on('onRequest', async (e, args) => {
  switch (args.command) {
    case 'openFinder':
      shell.openPath(args.value)
      break
    default:
      console.log(`unknown request command ${args}`)
  }
})
