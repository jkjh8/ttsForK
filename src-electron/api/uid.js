import { v4 as uuidv4 } from 'uuid'
import db from '/src-electron/db'
import logger from '/src-electron/logger'

let uid

async function getUid() {
  try {
    const r = await db.findOne({ key: 'uid' })
    if (r && r.value) {
      uid = r.value
    } else {
      await makeUid()
    }
    return uid
  } catch (error) {
    logger.error(`get uid error: ${error}`)
  }
}

async function makeUid() {
  try {
    const current = uuidv4()
    await db.update(
      { key: 'uid' },
      { $set: { value: current } },
      { upsert: true }
    )
    uid = current
    logger.info(`make new uid: ${uid}`)
    return uid
  } catch (error) {
    logger.error(`make uid error: ${error}`)
  }
}

export { uid, getUid, makeUid }
