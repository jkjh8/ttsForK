import { protocol } from 'electron'
import fs from 'fs'
import logger from '/src-electron/logger'

function setLocalFileProtocol() {
  logger.info('Local file protocol registered')
  protocol.registerFileProtocol('local', (req, cb) => {
    console.log('call file path', req.url)
    const pathname = decodeURIComponent(req.url.replace('local://', ''))
    console.log(fs.existsSync(pathname))
    try {
      cb(pathname)
    } catch (error) {
      logger.error(`Error registering file protocol ${error}`)
    }
  })
}

export { setLocalFileProtocol }
