import { BrowserWindow as bw } from 'electron'
import { io } from 'socket.io-client'
import db from '/src-electron/db'
import logger from '/src-electron/logger'

import { makeUid } from '/src-electron/api/uid'

let socket

async function checkServerAddress() {
  const r = await db.findOne({ key: 'serveraddress' })
  if (r) {
    return r.value
  } else {
    await db.update(
      { key: 'serveraddress' },
      { $se: { value: 'http://localhost' } },
      { upset: true }
    )
    return 'http://localhost'
  }
}

async function checkUid() {
  const r = await db.findOne({ key: 'uid' })
  if (r) {
    return r.value
  } else {
    return await makeUid()
  }
}

async function connectSocket() {
  try {
    const addr = await checkServerAddress()
    const uid = await checkUid()

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

export { socket, checkServerAddress, connectSocket }
