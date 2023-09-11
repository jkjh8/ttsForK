import fs from 'fs'
import { BrowserWindow as bw, ipcMain, shell } from 'electron'
import { connectSocket } from '/src-electron/api/server'

ipcMain.on('onRequest', async (e, args) => {
  switch (args.command) {
    case 'openFinder':
      shell.openPath(args.value)
      break
    case 'removeFile':
      fs.unlinkSync(args.file)
      break
    case 'started':
      connectSocket()
      break
    default:
      console.log(`unknown request command ${args}`)
  }
})
