import { BrowserWindow as bw } from 'electron'
import { io } from 'socket.io-client'
import logger from '/src-electron/logger'
import { getAddress } from '../address'
import { getUid } from '../uid'

let socket

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
      logger.info(`Socket IO Connected ${socket.id}`)
      bw.fromId(1).webContents.send('onResponse', {
        key: 'connect',
        value: true
      })
    })

    socket.on('disconnect', () => {
      bw.fromId(1).webContents.send('onResponse', {
        key: 'connect',
        value: false
      })
    })

    return null
  } catch (error) {
    logger.error(`socket connect error: ${error}`)
  }
}

export { socket, connectSocket }
