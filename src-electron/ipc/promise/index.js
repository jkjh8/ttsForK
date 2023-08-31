import { ipcMain, dialog } from 'electron'
import db from '../../db'
import { socket, connectSocket } from '/src-electron/api/server'
import { makeUid } from '/src-electron/api/uid'

ipcMain.handle('onPromise', async (e, args) => {
  let rt = null

  switch (args.command) {
    case 'getDataFromDb':
      rt = await db.findOne({ key: args.value })
      break
    case 'getServerAddress':
      rt = await db.findOne({ key: 'serveraddress' })
      break
    case 'updateServerAddress':
      if (socket.connected) {
        socket.disconnect()
      }
      rt = await db.update(
        { key: 'serveraddress' },
        { $set: { value: args.value } },
        { upsert: true }
      )
      await connectSocket()
      break
    case 'getId':
      const r = await db.findOne({ key: 'uid' })
      if (r && r.value) {
        rt = r.value
      } else {
        rt = null
      }
      break
    case 'makeNewUid':
      if (socket.connected) {
        socket.disconnect()
      }
      rt = await makeUid()
      connectSocket()
      break
    case 'updateId':
      if (socket.connected) {
        socket.disconnect()
      }
      await db.update(
        { key: 'uid' },
        { $set: { value: args.value } },
        { upsert: true }
      )
      rt = args.value
      connectSocket()
      break
    case 'selectFolder':
      const folders = dialog.showOpenDialogSync({
        title: 'Select a folder',
        properties: ['openDirectory']
      })
      console.log(folders)
      await db.update(
        { key: 'folder' },
        { $set: { value: folders[0] } },
        { upsert: true }
      )
      rt = folders[0]
      break
    default:
      console.log('not defined command ' + args.command)
      break
  }

  return rt
})
