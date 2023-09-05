import { app, dialog } from 'electron'
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

async function updateMediaFolder() {
  try {
    const folders = dialog.showOpenDialogSync({
      title: 'Select Media Folder',
      properties: ['openDirectory']
    })
    const r = await db.update(
      { key: 'folder' },
      { $set: { value: folders[0] } },
      { upsert: true }
    )
    if (r) {
      mediaFolder = folders[0]
      logger.info(`update media folder ${folders[0]}`)
    }
    return mediaFolder
  } catch (error) {
    logger.error(`update media folder error: ${error}`)
  }
}

export { mediaFolder, getMediaFolder, updateMediaFolder }
