import { protocol } from 'electron'
import logger from '/src-electron/logger'

function setLocalFileProtocol() {
  logger.info('Local file protocol registered')
  protocol.registerFileProtocol('local', (req, cb) => {
    const pathname = decodeURIComponent(req.url.replace('local://', ''))
    try {
      cb(pathname)
    } catch (error) {
      logger.error(`Error registering file protocol ${error}`)
    }
  })
}

export { setLocalFileProtocol }
