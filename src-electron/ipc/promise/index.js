import { ipcMain } from 'electron'
import { v4 as uuidv4 } from 'uuid'
import db from '/src-electron/db'
import { getAddress, updateAddress } from '/src-electron/api/address'
import { getUid, makeUid, updateUid } from '/src-electron/api/uid'
import { getMediaFolder, updateMediaFolder } from '/src-electron/api/folder'
import { ttsInfo, ttsGet } from '/src-electron/api/tts'
import { mediaFolder } from '/src-electron/api/folder'

ipcMain.handle('onPromise', async (e, args) => {
  let rt = null

  switch (args.command) {
    case 'getDataFromDb':
      rt = await db.findOne({ key: args.value })
      break
    case 'getAddress':
      rt = await getAddress()
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
    case 'getFolder':
      rt = await getMediaFolder()
      break
    case 'ttsGetInfo':
      if (ttsInfo) {
        rt = ttsInfo
      } else {
        rt = await ttsGet(['get_info'])
      }
      break
    case 'ttsMakeFile':
      let filename
      if (!args.filename) {
        filename = uuidv4()
      } else {
        filename = args.filename
      }
      rt = await ttsGet([
        'make_file',
        args.message,
        mediaFolder,
        filename,
        args.rate,
        args.voice
      ])
      console.log(rt)
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
