import db from '/src-electron/db'
import { socket, connectSocket } from '/src-electron/api/server'
import logger from '/src-electron/logger'

let address = 'http://127.0.0.1'

async function getAddress() {
  try {
    const r = await db.findOne({ key: 'serverAddress' })
    if (r && r.value) {
      address = r.value
    }
    await db.update(
      { key: 'serverAddress' },
      { $set: { value: address } },
      { upsert: true }
    )
    return address
  } catch (error) {
    logger.error(`get address error: ${error}`)
  }
}

async function updateAddress(value) {
  try {
    if (socket.connected) {
      socket.disconnect()
    }
    const r = await db.update(
      { key: 'serverAddress' },
      { $set: { value: value } },
      { upsert: true }
    )
    connectSocket()
    if (r) {
      return value
    }
  } catch (error) {
    logger.error(`update address error: ${error}`)
  }
}

export { address, getAddress, updateAddress }
