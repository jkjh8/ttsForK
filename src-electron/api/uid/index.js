import { v4 as uuidv4 } from 'uuid'
import { BrowserWindow as bw } from 'electron'
import db from '/src-electron/db'

async function makeUid() {
  const uid = uuidv4()
  await db.update({ key: 'uid' }, { $set: { value: uid } }, { upsert: true })
  bw.fromId(1).webContents.send('onResponse', { key: 'updateUid', value: uid })
  return uid
}

export { makeUid }
