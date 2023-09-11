import { app, session, BrowserWindow, nativeTheme } from 'electron'
import path from 'path'
import os from 'os'
import db from './db'

import { ttsGet } from './api/tts'
import { apiServerOpen } from './api/server/index'
import { getMediaFolder } from './api/folder'
import { setLocalFileProtocol } from './api/files'
// const vueDevToolPath = path.join(
//   os.homedir(),
//   'AppData/Local/Google/Chrome/User Data/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/6.5.0_0'
// )

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    )
  }
} catch (_) {}

// import ipc functions
import('./ipc')

let mainWindow

async function createWindow() {
  // init size, position
  const size = await db.findOne({ key: 'windowSize' })
  const position = await db.findOne({ key: 'windowPosition' })

  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: size && size.width ? size.width : 800,
    height: size && size.height ? size.height : 600,
    x: position && position.x ? position.x : 100,
    y: position && position.y ? position.y : 50,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegrationInWorker: true,
      sandbox: false,
      // More info: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })

  mainWindow.loadURL(process.env.APP_URL)
  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('move', async () => {
    const position = mainWindow.getPosition()
    await db.update(
      {
        key: 'windowPosition'
      },
      {
        $set: {
          x: position[0],
          y: position[1]
        }
      },
      { upsert: true }
    )
  })
}

app.whenReady().then(async () => {
  await ttsGet({ comm: 'get_info' })
  setLocalFileProtocol()
  createWindow()
  await getMediaFolder()
  await apiServerOpen()
  // await connectSocket()
})

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
