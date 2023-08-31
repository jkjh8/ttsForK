import path from 'path'
import { app } from 'electron'
import { PythonShell } from 'python-shell'
import { v4 as uuidv4 } from 'uuid'
import logger from '/src-electron/logger'

function getTTSInfo() {
  const options = {
    mode: 'json',
    pythonPath: 'C:/Users/jkjh8/Desktop/dev/ttsForK/python/Scripts/python.exe',
    pythonOptions: ['-u'],
    scriptPath: __dirname,
    args: ['get_info']
  }
  console.log('start python')
  PythonShell.run('tts.py', options)
    .then((result) => {
      console.log('done', result)
    })
    .catch((err) => {
      console.log('error', err)
    })
}

export { getTTSInfo }
