import { ipcMain } from 'electron'
import db from '../../db'
import { updateAddress } from '/src-electron/api/address'
import { getUid, makeUid, updateUid } from '/src-electron/api/uid'
import { updateMediaFolder } from '/src-electron/api/folder'
import { ttsInfo, ttsGet } from '/src-electron/api/tts'

ipcMain.handle('onPromise', async (e, args) => {
  let rt = null

  switch (args.command) {
    case 'getDataFromDb':
      rt = await db.findOne({ key: args.value })
      break
    case 'updateServerAddress':
      await updateAddress(args.value)
      break
    // id
    case 'getId':
      rt = await getUid()
      break
    case 'makeNewUid':
      rt = await makeUid()
      break
    case 'updateId':
      rt = await updateUid(args.value)
      break
    // folder
    case 'selectFolder':
      rt = await updateMediaFolder()
      break
    case 'ttsGetInfo':
      if (ttsInfo) {
        rt = ttsInfo
      } else {
        rt = await ttsGet(['get_info'])
      }
      break
    case 'refreshTtsInfo':
      rt = await ttsGet(['get_info'])
      break
    default:
      console.log('not defined command ' + args.command)
      break
  }

  return rt
})
