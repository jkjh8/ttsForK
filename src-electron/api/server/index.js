import { BrowserWindow as bw } from 'electron'
import { io } from 'socket.io-client'

import db from '/src-electron/db'
import logger from '/src-electron/logger'
import { getAddress } from '../address'
import { getUid } from '../uid'

let socket
let online = {
  status: false,
  id: null
}

async function connectSocket() {
  try {
    const addr = await getAddress()
    const uid = await getUid()

    socket = io(`${addr}/device`, {
      transports: ['websocket'],
      extraHeaders: { apiKey: uid, type: 'tts' },
      withCredentials: true,
      autoConnect: true,
      reconnectionDelayMax: 5000
    })

    socket.on('connect', () => {
      online.status = true
      online.id = socket.id
      logger.info(`Socket IO Connected ${socket.id}`)
      bw.fromId(1).webContents.send('onResponse', {
        key: 'connect',
        value: online
      })
    })

    socket.on('disconnect', () => {
      online.status = false
      bw.fromId(1).webContents.send('onResponse', {
        key: 'connect',
        value: online
      })
    })

    return null
  } catch (error) {
    logger.error(`socket connect error: ${error}`)
  }
}

function apiServerOpen() {
  return new Promise(async (resolve, reject) => {
    try {
      const r = await db.findOne({ key: 'apiserver' })
      if (r && r.value) {
        import('/src-electron/web')
      }
      resolve(r.value)
    } catch (error) {
      reject(error)
    }
  })
}

export { socket, connectSocket, online, apiServerOpen }
