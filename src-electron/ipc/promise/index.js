import { ipcMain } from 'electron'
import { v4 as uuidv4 } from 'uuid'
import db from '/src-electron/db'
import { online } from '/src-electron/api/server'
import { getAddress, updateAddress } from '/src-electron/api/address'
import { getUid, makeUid, updateUid } from '/src-electron/api/uid'
import { getMediaFolder, updateMediaFolder } from '/src-electron/api/folder'
import { ttsInfo, ttsGet } from '/src-electron/api/tts'
import { mediaFolder } from '/src-electron/api/folder'

ipcMain.handle('onPromise', async (e, args) => {
  let rt = null

  switch (args.command) {
    case 'online':
      rt = online
      break
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
        rt = await ttsGet({ comm: 'get_info' })
      }
      break
    case 'ttsMakeFile':
      rt = await ttsGet({ ...args, comm: 'make_file' })
      console.log(rt)
      break
    case 'refreshTtsInfo':
      rt = await ttsGet({ comm: 'get_info' })
      break
    case 'apiserver':
      console.log(args)
      rt = await db.update(
        { key: 'apiserver' },
        { $set: { value: args.value, port: args.port } },
        { upsert: true }
      )
      break

    // default
    default:
      console.log('not defined command ' + JSON.stringify(args))
      break
  }

  return rt
})
