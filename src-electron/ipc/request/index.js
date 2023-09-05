import { BrowserWindow as bw, ipcMain } from 'electron'
import { getTTSInfoSync } from '/src-electron/api/tts'

ipcMain.on('onRequest', async (e, args) => {
  switch (args.command) {
    case 'connect':
      // console.log('start, tts')
      // bw.fromId(1).webContents.send('onResponse', {
      //   key: 'tts',
      //   value: await getTTSInfoSync()
      // })
      break
    default:
      console.log(`unknown request command ${args}`)
  }
})
