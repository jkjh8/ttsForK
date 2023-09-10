import fs from 'fs'
import { BrowserWindow as bw, ipcMain, shell } from 'electron'

ipcMain.on('onRequest', async (e, args) => {
  switch (args.command) {
    case 'openFinder':
      shell.openPath(args.value)
      break
    case 'removeFile':
      fs.unlinkSync(args.file)
      break
    default:
      console.log(`unknown request command ${args}`)
  }
})
