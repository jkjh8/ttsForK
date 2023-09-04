import { app } from 'electron'
import db from '/src-electron/db'
import logger from '/src-electron/logger'

let mediaFolder

async function getMediaFolder() {
  try {
    const r = await db.findOne({ key: 'folder' })
    if (r && r.value) {
      mediaFolder = r.value
    } else {
      mediaFolder = app.getPath('home')
    }
    logger.info(`Media folder: ${mediaFolder}`)
    return mediaFolder
  } catch (error) {
    logger.error(`get media folder error: ${error}`)
  }
}

async function updateMediaFolder(f) {
  try {
    const r = await db.update(
      { key: 'folder' },
      { $set: { value: f } },
      { upsert: true }
    )
    if (r) {
      mediaFolder = f
      logger.info(`update media folder ${f}`)
    }
    return mediaFolder
  } catch (error) {
    logger.error(`update media folder error: ${error}`)
  }
}

export { mediaFolder, getMediaFolder, updateMediaFolder }
