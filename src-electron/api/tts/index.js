import path from 'path'
import os from 'os'
import { BrowserWindow as bw } from 'electron'
import { PythonShell } from 'python-shell'
import { v4 as uuidv4 } from 'uuid'
import logger from '/src-electron/logger'

const platform = process.platform || os.platform()
console.log('tts', platform)
let pythonPath

if (process.env.NODE_ENV === 'production') {
}

if (platform === 'win32') {
  if (process.env.NODE_ENV === 'production') {
    pythonPath = path.resolve(
      process.resourcesPath,
      'python/Scripts/python.exe'
    )
  } else {
    pythonPath = path.resolve(__dirname, '../../../python/Scripts/python.exe')
  }
} else {
  pythonPath = path.resolve(__dirname, '../../../python/bin/python')
}

function getTTSInfo() {
  const options = {
    mode: 'json',
    pythonPath: pythonPath,
    pythonOptions: ['-u'],
    scriptPath: __dirname,
    args: ['get_info']
  }
  console.log('start python')
  PythonShell.run('tts.py', options)
    .then((result) => {
      console.log('done', result)
      bw.fromId(1).webContents.send('onResponse', {
        key: 'tts',
        value: result[0]
      })
    })
    .catch((err) => {
      console.log('error', err)
    })
}

export { getTTSInfo }
